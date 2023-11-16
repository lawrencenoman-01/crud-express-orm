# Basic Express

Basic express.js project with basic routes:
* Express
* Joi
* Cors
* Sequelize
* MySQL2

---

## URL

_Server_
```
http://localhost:8080
```
---

## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

## RESTful endpoints

### Tugas Table
#### GET /api/tugas

> Get all data tugas

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        {
          "id": "<id>",
          "mahasiswaId": "<mahasiswaId>",
          "deskripsi": "<deskripsi>",
          "nilai": "<nilai>",
          "createdAt": "<date>",
          "updatedAt": "<date>",
          "tugasMahasiswa": {
            <data_mahasiswa>
          }
        }
    ],
    "message": "Success"
}
```

---

#### GET /api/tugas/:id

> Get all by id

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": {
        "id": <id>,
        "mahasiswaId": <mahasiswaId>,
        "deskripsi": "<deskripsi>",
        "nilai": <nilai>,
        "createdAt": "<date>",
        "updatedAt": "<date>",
        "tugasMahasiswa": {
            <data_mahasiswa>
        }
    },
    "message": "Success"
}
```

---

#### POST /api/tugas

> Create tugas

_Request Header_
```
not needed
```

_Request Body_
```
{
  "mahasiswaId" : "<mahasiswaId>",
  "deskripsi" : "<deskripsi>"
  "nilai" : "<nilai>"
}
```

_Response (201)_
```
{
    "data": [<data_tugas>]
    "status": "Successfully Added Tugas"
}
```

_Response (404 - Validation Error)_
```
{
    "status": "Deskripsi Tugas does not same",
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"description\" is required"
}
```

---

#### PUT /api/tugas/:id

> Update by id

_Request Params_
```
/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "deskripsi": "<deskripsi>",
  "nilai": "<nilai>",
}
```

_Response (200)_
```
{
    "data": [
        <tugas_list>
    ],
    "message": "Tugas updated Successfully"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"deskripsi\" is not allowed to be empty"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Tugas dengan id ${id} yang  anda cari tidak ada."
}
```

---

#### DELETE /api/tugas/:id

> Delete by id

_Request Params_
```
/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "Tugas dengan id ${id} terhapus."
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Tugas dengan id ${id} yang anda cari tidak ada."
}
```

---

### Mahasiswa Table
#### GET /api/mahasiswa/

> Get all data mahasiswa

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        {
          "id": "<id>",
          "name": "<name>",
          "address": "<address>",
          "email": "<email>",
          "createdAt": "<date>",
          "updatedAt": "<date>",
          "tugasMahasiswa": {
            <data_tugas>
          }
        }
    ],
    "message": "Success"
}
```

---

#### GET /api/mahasiswa/:id
> Get all by id

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": {
        "id": <id>,
        "name": <name>,
        "address": "<address>",
        "email": <email>,
        "createdAt": "<date>",
        "updatedAt": "<date>",
        "tugasMahasiswa": {
            <data_mahasiswa>
        }
    },
    "message": "Success"
}
```

---

#### POST /api/mahasiswa

> Create mahasiswa

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name" : "<name>",
  "address" : "<address>"
  "email" : "<email>"
  "matkulIds" : "[matkulIds,matkulIds]"
}
```

_Response (201)_
```
{
    "status": "Successfully Added Mahasiswa"
}
```

_Response (404 - Validation Error)_
```
{
    "status": "Deskripsi Tugas does not same",
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"description\" is required"
}
```

---

#### PUT /api/mahasiswa/:id

> Update by id

_Request Params_
```
/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": "<name>",
  "address": "<address>",
  "email": "<email>"
}
```

_Response (200)_
```
{
    "data": [
        <mahasiswa_list>
    ],
    "message": "Mahasiswa updated Successfully"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" is not allowed to be empty"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Mahasiswa dengan id ${id} tidak terdaftar."
}
```

---


#### DELETE /api/mahasiswa/:id

> Delete by id

_Request Params_
```
/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "Mahasiswa dengan id ${id} terhapus"
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Mahasiswa dengan id ${id} tidak terdaftar."
}
```

---


### Mata Kuliah Table
#### GET /api/matkul/

> Get all data mata kuliah

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        {
          "id": "<id>",
          "name": "<name>",
          "sks": "<sks>",
          "description": "<description>",
          "createdAt": "<date>",
          "updatedAt": "<date>",
          "Mahasiswas": [
            {
              "<list_mahasiswa>": {
                "<data_mahasiswa>",
                "<DaftarMatkul>": {
                  "<list_daftarMatkul>"
                }
              }
            }
          ]

        }
    ],
    "message": "Success"
}
```

---

#### GET /api/matkul/:id
> Get all by id

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        {
          "id": "<id>",
          "name": "<name>",
          "sks": "<sks>",
          "description": "<description>",
          "createdAt": "<date>",
          "updatedAt": "<date>",
          "Mahasiswas": [
            {
              "<list_mahasiswa>": {
                "<data_mahasiswa>",
                "<DaftarMatkul>": {
                  "<list_daftarMatkul>"
                }
              }
            }
          ]

        }
    ],
    "message": "Success"
}
```

---

#### POST /api/matkul

> Create mata kuliah

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name" : "<name>",
  "sks" : "<sks>"
  "deskripsi" : "<deskripsi>"
}
```

_Response (201)_
```
{
    "data": [<data_matkul>]
    "status": "Successfully Added Mata Kuliah"
}
```

_Response (404 - Validation Error)_
```
{
    "status": "Deskripsi Tugas does not same",
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"description\" is required"
}
```

---

#### PUT /api/matkul/:id

> Update by id

_Request Params_
```
/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": "<name>",
  "sks": "<sks>",
  "description": "<description>"
}
```

_Response (200)_
```
{
    "data": [
        <matkul_list>
    ],
    "message": "Mata Kuliah updated Successfully"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" is not allowed to be empty"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Mata Kuliah dengan id ${id} yang anda cari tidak ada."
}
```

---