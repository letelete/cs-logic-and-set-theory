import json
import uuid
import datetime

FILE_PATH = "baza-pytan.json"


def generate_element():
    id = str(uuid.uuid4())
    created_at = str(datetime.datetime.now())
    img = id + ".png"
    question = ""
    notes = ""
    return {
        "id": id,
        "created_at": created_at,
        "img": img,
        "question": question,
        "notes": notes,
    }


json_obj = None
with open(FILE_PATH, "r", encoding="utf-8") as f:
    json_obj = json.load(f)
    next_element = generate_element()
    json_obj.append(next_element)

if json_obj:
    with open(FILE_PATH, "w", encoding="utf-8") as f:
        json.dump(json_obj, f, ensure_ascii=False, indent=2, sort_keys=True)
