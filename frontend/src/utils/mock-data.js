export let rooms = [
    {"id":"H1-101"},
    {"id":"H1-102"},
    {"id":"H2-201"},
    {"id":"H2-202"},
    {"id":"H3-101"},
    {"id":"H3-102"}
]
export let printers = [
    { "id": "H1-101-1", "room": "H1-101","description": "HP101-X", "start": "10:11 10/03/2020", "status": "on"},
    { "id": "H1-102-1", "room": "H1-102", "description": "HP101-X", "start": "10:13 10/03/2020", "status": "on"},
    { "id": "H2-201-1", "room": "H2-201", "description": "Canon123", "start": "12:31 10/03/2020", "status": "on"},
    { "id": "H2-202-1", "room": "H2-202", "description": "Canon123", "start": "12:21 10/03/2020", "status": "on"}
]
export let students = [
    { "id": 2211020},
    { "id": 2210202},
    { "id": 2210203},
    { "id": 2210231},
    { "id": 2212020}
]
export let printingRequests = [
    { 
      "id": 1,
      "student_id": 2211020,
      "printer_id": "H1-101-1",
      "size": "A3",
      "copy": 10,
      "side": 1,
      "page": 12,
      "file": "oiw.docx",
      "start": "10:10 10/02/2020",
      "status": "waiting"
    },
    { 
      "id": 2,
      "student_id": 2210202,
      "printer_id": "H1-101-1",
      "size": "A4",
      "copy": 10,
      "side": 2,
      "page": 30,
      "file": "ower.docx",
      "start": "10:12 10/02/2021",
      "status": "waiting"
    },
    { 
      "id": 3,
      "student_id": 2210231,
      "printer_id": "H1-101-1",
      "size": "A5",
      "copy": 2,
      "side": 2,
      "page": 40,
      "file": "er.docx",
      "start": "10:13 10/02/2022",
      "status": "waiting"
    },
    { 
      "id": 4,
      "student_id": 2210231,
      "printer_id": "H1-101-1",
      "size": "A4",
      "copy": 10,
      "side": 1,
      "page": 20,
      "file": "er1.docx",
      "start": "10:13 10/10/2024",
      "end": "11:13 10/10/2024",
      "status": "done"
    },
    { 
      "id": 5,
      "student_id": 2210231,
      "printer_id": "H1-101-1",
      "size": "A5",
      "copy": 3,
      "side": 2,
      "page": 40,
      "file": "er2.docx",
      "start": "10:13 10/08/2024",
      "end": "12:13 10/08/2024",
      "status": "done"
    },
    { 
      "id": 6,
      "student_id": 2210231,
      "printer_id": "H1-101-1",
      "size": "A5",
      "copy": 10,
      "side": 2,
      "page": 30,
      "file": "er3.docx",
      "start": "08:13 10/02/2024",
      "end": "10:13 10/02/2024",
      "status": "done"
    }
]
export let systemHistory = [
    {
        "id": 2211020,
        "printer": "H1-101-1",
        "file": "doc1.pdf",
        "size": "A4",
        "copy": 10,
        "start": "10:11 10/11/2024",
        "end": "11:10 10/11/2024"
    },
    {
        "id": 2211021,
        "printer": "H2-201-1",
        "file": "doc2.docx",
        "size": "A4",
        "copy": 11,
        "start": "10:12 10/11/2024",
        "end": "11:12 10/11/2024"
    },
    {
        "id": 2211022,
        "printer": "H3-103-1",
        "file": "doc3.pdf",
        "size": "A4",
        "copy": 20,
        "start": "10:14 10/11/2024",
        "end": "11:14 10/11/2024"
    }
]
export let validDocs = {
    "array": ["docx","pdf"]
}
export let defaultPage = {
    "page":10,
    "date":"01/01/2025"
}
export let reports = [
    {
        "name":"BC-T11-2024",
        "link":"BC-T11-2024.xsl",
        "date":"03:10 01/12/2024"
    },
    {
        "name":"BC-T10-2024",
        "link":"BC-T10-2024.xsl",
        "date":"05:08 01/11/2024"
    },
    {
        "name":"BC-T9-2024",
        "link":"BC-T9-2024.xsl",
        "date":"01:05 01/10/2024"
    }
]