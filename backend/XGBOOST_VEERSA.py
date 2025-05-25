

import numpy as np
import pandas as pd
import optuna
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score, accuracy_score, precision_score, recall_score, classification_report

# Load data
data = pd.read_csv(r"C:\Users\sarthak mohapatra\Downloads\finaldatset3aftericd9_minmax.csv")
X = data.drop('readmitted_30_days', axis=1)
y = data['readmitted_30_days']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Compute scale_pos_weight
neg_count = y_train.value_counts()[0]
pos_count = y_train.value_counts()[1]
scale_pos_weight_value = neg_count / pos_count

# Define objective function
def objective(trial):
    params = {
        "objective": "binary:logistic",
        "eval_metric": "aucpr",
        "use_label_encoder": False,
        "random_state": 42,
        "scale_pos_weight": scale_pos_weight_value,
        "max_depth": trial.suggest_int("max_depth", 3, 10),
        "learning_rate": trial.suggest_float("learning_rate", 0.01, 0.3),
        "n_estimators": trial.suggest_int("n_estimators", 100, 1000),
        "subsample": trial.suggest_float("subsample", 0.5, 1.0),
        "colsample_bytree": trial.suggest_float("colsample_bytree", 0.5, 1.0),
        "gamma": trial.suggest_float("gamma", 0, 5),
        "reg_alpha": trial.suggest_float("reg_alpha", 0, 1),
        "reg_lambda": trial.suggest_float("reg_lambda", 0, 1)
    }

    # Suggest a weight multiplier for severe cases with high abnormal_lab_count
    weight_multiplier = trial.suggest_float("weight_multiplier", 0, 5)
    
    # Define weights: higher for severity_rank > 1 AND high abnormal_lab_count
    lab_threshold = X_train['abnormal_lab_count'].median()  # Or use a domain-specific threshold
    weight_train = np.where(
        (X_train['severity_rank'] > 1) & (X_train['abnormal_lab_count'] > lab_threshold),
        1 + weight_multiplier,  # Boost weight for severe cases with high abnormal labs
        1  # Default weight for others
    )

    model = xgb.XGBClassifier(**params)
    model.fit(X_train, y_train, sample_weight=weight_train)
    y_pred = model.predict(X_test)
    return f1_score(y_test, y_pred)

# Run optimization
study = optuna.create_study(direction="maximize")
study.optimize(objective, n_trials=50)

print("Best Trial:")
print(f"  F1-Score: {study.best_value:.4f}")
print("  Best Hyperparameters:", study.best_params)

# Train final model
best_params = study.best_params
weight_multiplier = best_params.pop("weight_multiplier")
best_params.update({
    "objective": "binary:logistic",
    "eval_metric": "logloss",
    "use_label_encoder": False,
    "random_state": 42,
    "scale_pos_weight": scale_pos_weight_value
})

final_model = xgb.XGBClassifier(**best_params)
lab_threshold = X_train['abnormal_lab_count'].median()
weight_train = np.where(
    (X_train['severity_rank'] > 1) & (X_train['abnormal_lab_count'] > lab_threshold),
    1 + weight_multiplier,
    1
)
final_model.fit(X_train, y_train, sample_weight=weight_train)
y_pred = final_model.predict(X_test)

print("\nFinal Model Evaluation:")
print(f"Accuracy:  {accuracy_score(y_test, y_pred):.4f}")
print(f"Precision: {precision_score(y_test, y_pred):.4f}")
print(f"Recall:    {recall_score(y_test, y_pred):.4f}")
print(f"F1-Score:  {f1_score(y_test, y_pred):.4f}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))
import joblib

# Save model
joblib.dump(final_model, 'xgb_model_joblib.pkl')
print("model_saved")


# xgb.plot_importance(xgb_model)
# plt.title("Feature Importance for Readmission Prediction")
# plt.savefig('feature_importance.png')
# plt.close()


# import optuna
# import pandas as pd
# from sklearn.model_selection import train_test_split, cross_val_score
# from sklearn.ensemble import RandomForestClassifier, StackingClassifier
# from sklearn.linear_model import LogisticRegression
# from xgboost import XGBClassifier
# from sklearn.metrics import precision_score, recall_score, f1_score, accuracy_score, classification_report
# from sklearn.preprocessing import StandardScaler

# # Load data
# data = pd.read_csv(r"C:\Users\sarthak mohapatra\Downloads\done.csv")
# X = data.drop('readmitted_30_days', axis=1)
# y = data['readmitted_30_days']

# # Train-test split
# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.2, random_state=42, stratify=y
# )

# # Standardize for Logistic Regression
# scaler = StandardScaler()
# X_train_scaled = scaler.fit_transform(X_train)
# X_test_scaled = scaler.transform(X_test)

# # --- OPTUNA TUNING ---

# # 1. Random Forest
# def rf_objective(trial):
#     params = {
#         'n_estimators': trial.suggest_int('n_estimators', 100, 1000),
#         'max_depth': trial.suggest_int('max_depth', 5, 30),
#         'min_samples_split': trial.suggest_int('min_samples_split', 2, 20),
#         'min_samples_leaf': trial.suggest_int('min_samples_leaf', 1, 20),
#         'class_weight': 'balanced',
#         'random_state': 42
#     }
#     model = RandomForestClassifier(**params)
#     return cross_val_score(model, X_train, y_train, cv=5, scoring='f1').mean()

# study_rf = optuna.create_study(direction='maximize')
# study_rf.optimize(rf_objective, n_trials=30)
# best_rf_params = study_rf.best_params
# best_rf_params.update({'class_weight': 'balanced', 'random_state': 42})

# # 2. Logistic Regression
# def lr_objective(trial):
#     params = {
#         'C': trial.suggest_float('C', 0.01, 10.0, log=True),
#         'penalty': trial.suggest_categorical('penalty', ['l1', 'l2']),
#         'solver': 'liblinear',
#         'class_weight': 'balanced',
#         'random_state': 42
#     }
#     model = LogisticRegression(**params)
#     return cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='f1').mean()

# study_lr = optuna.create_study(direction='maximize')
# study_lr.optimize(lr_objective, n_trials=30)
# best_lr_params = study_lr.best_params
# best_lr_params.update({'solver': 'liblinear', 'class_weight': 'balanced', 'random_state': 42})

# # 3. XGBoost (already tuned)
# best_xgb_params = {
#     "objective": "binary:logistic",
#     "eval_metric": "logloss",
#     "use_label_encoder": False,
#     "random_state": 42,
#     "scale_pos_weight": y_train.value_counts()[0] / y_train.value_counts()[1],
#     "max_depth": 7,
#     "learning_rate": 0.05,
#     "n_estimators": 500,
#     "subsample": 0.8,
#     "colsample_bytree": 0.8,
#     "gamma": 1.0,
#     "reg_alpha": 0.1,
#     "reg_lambda": 0.1
# }

# # --- MODELS ---
# xgb_clf = XGBClassifier(**best_xgb_params)
# rf_clf = RandomForestClassifier(**best_rf_params)
# lr_clf = LogisticRegression(**best_lr_params)

# # --- STACKING ENSEMBLE ---
# stacking_clf = StackingClassifier(
#     estimators=[
#         ('xgb', xgb_clf),
#         ('rf', rf_clf),
#         ('lr', lr_clf)
#     ],
#     final_estimator=LogisticRegression(
#         solver='liblinear',
#         class_weight='balanced',
#         random_state=42
#     ),
#     cv=5,
#     n_jobs=-1,
#     passthrough=False
# )

# # Fit and Evaluate
# stacking_clf.fit(X_train_scaled, y_train)
# y_pred = stacking_clf.predict(X_test_scaled)

# print("\n📊 Evaluation (Stacking):")
# print(f"Accuracy:  {accuracy_score(y_test, y_pred):.4f}")
# print(f"Precision: {precision_score(y_test, y_pred):.4f}")
# print(f"Recall:    {recall_score(y_test, y_pred):.4f}")
# print(f"F1-Score:  {f1_score(y_test, y_pred):.4f}")
# print("\nClassification Report:")
# print(classification_report(y_test, y_pred))


# import joblib

# # Save model
# joblib.dump(final_model, 'xgb_model_joblib.pkl')
# print("model_saved")

# # Load model
# loaded_model = joblib.load('xgb_model_joblib.pkl')
