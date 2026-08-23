# Google Colab / Python에서 Roboflow가 아닌 직접 YOLO 학습을 해보고 싶은 팀용
# 2026년 Ultralytics 문서 기준 예시
# !pip install -U ultralytics

from ultralytics import YOLO

# Roboflow 등에서 YOLO 형식으로 내보낸 dataset.yaml 경로를 사용하세요.
DATASET_YAML = "/content/dataset/data.yaml"

# 현재 Ultralytics 문서의 nano 모델 예시
model = YOLO("yolo26n.pt")

results = model.train(
    data=DATASET_YAML,
    epochs=50,
    imgsz=640,
    patience=20
)

# 학습 후 best.pt를 이용해 새 이미지 추론
best = YOLO("runs/detect/train/weights/best.pt")
pred = best.predict(source="/content/test.jpg", conf=0.35, save=True)

print(pred)
