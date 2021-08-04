import json
import sys
from datetime import datetime

"""
The JSON representation of the firestore must be from the use of "firestore-export" command of "node-firestore-import-export" npm package.
See more: https://www.npmjs.com/package/node-firestore-import-export
"""


def main():
    # path to the json
    db = ""
    try:
        db = sys.argv[1]
    except IndexError:
        db = input("path to firestore json: ").strip()

    time_capsules_collection = get_time_capsules(db)
    for id, doc in time_capsules_collection.items():
        for email, capsules_of_this_email in doc.items():
            # TODO filter the capsules of this email, such as remove duplicate texts
            for capsule in capsules_of_this_email:
                name = capsule["name"]
                timestamp = get_capsule_datetime(capsule)
                text = capsule["text"]
                do_something(id, email, name, timestamp, text)


def do_something(id: str, email: str, name: str, timestamp: datetime, text: str):
    # TODO printing for now :)
    print("\n".join([id, email, name, str(timestamp), text]), end="\n\n")


def get_capsule_datetime(capsule):
    seconds = capsule["timestamp"]["value"]["_seconds"]
    return datetime.fromtimestamp(seconds)


def get_time_capsules(db: str) -> dict:
    collection = "time_capsules"
    with open(db, "r", encoding="utf8") as f:
        db_json = json.load(f)
        return db_json['__collections__'][collection]


if __name__ == "__main__":
    main()
