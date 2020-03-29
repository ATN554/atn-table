export const columns = [
  { 
    title: "Ид.", 
    field: "ID", 
    type: "integer", 
    align: "right", 
    width: 150, 
    mimWidth: 10, 
    maxWidth: 250, 
  },
  { 
    title: "Наименование", 
    field: "FULL_NAME", 
    width: 250, 
    tableData: {
      sort: {
        id: 1,
        order: 'asc'
      }
    }
  },
  { 
    title: "Сумма", 
    field: "SM", 
    type: "number", 
    align: "right", 
    width: 120, 
  },
  { 
    title: "Дата создания", 
    field: "DT_CREATE", 
    type: "date", 
    align: "center", 
    format: "DD.MM.YYYY", 
    width: 140, 
  },
  {
    title: "Исполнитель", 
    field: "URC", 
    type: "number", 
    width: 140, 
  }
];

export const totals = {
  "First-Column-Text": "Итого: ",
  "SM": "1023.56"
};

export const data = [
  {
    "DT_CREATE": "08.05.2019",
    "URC": 2336,
    "FULL_NAME": "Peru",
    "SM": "2.86",
    "ID": 1
  },
  {
    "DT_CREATE": "24.09.2019",
    "URC": 7145,
    "FULL_NAME": "Iceland",
    "SM": "1.29",
    "ID": 2
  },
/*  {
    "DT_CREATE": "24.04.2019",
    "URC": 259,
    "FULL_NAME": "Namibia",
    "SM": "6.27",
    "ID": 3
  },
  {
    "DT_CREATE": "02.08.2019",
    "URC": 2893,
    "FULL_NAME": "Montserrat",
    "SM": "2.76",
    "ID": 4
  },
  {
    "DT_CREATE": "24.10.2019",
    "URC": 5030,
    "FULL_NAME": "Togo",
    "SM": "3.55",
    "ID": 5
  },
  {
    "DT_CREATE": "11.07.2019",
    "URC": 3958,
    "FULL_NAME": "Portugal",
    "SM": "0.07",
    "ID": 6
  },
  {
    "DT_CREATE": "16.01.2020",
    "URC": 7302,
    "FULL_NAME": "Romania",
    "SM": "2.78",
    "ID": 7
  },
  {
    "DT_CREATE": "04.12.2019",
    "URC": 9507,
    "FULL_NAME": "Ecuador",
    "SM": "1.44",
    "ID": 8
  },
  {
    "DT_CREATE": "22.12.2019",
    "URC": 6874,
    "FULL_NAME": "Wallis and Futuna",
    "SM": "7.46",
    "ID": 9
  },
  {
    "DT_CREATE": "18.09.2019",
    "URC": 3082,
    "FULL_NAME": "Micronesia",
    "SM": "8.44",
    "ID": 10
  },
  {
    "DT_CREATE": "07.02.2020",
    "URC": 4449,
    "FULL_NAME": "Australia",
    "SM": "0.89",
    "ID": 11
  },
  {
    "DT_CREATE": "23.05.2019",
    "URC": 5372,
    "FULL_NAME": "Zambia",
    "SM": "6.38",
    "ID": 12
  },
  {
    "DT_CREATE": "21.01.2020",
    "URC": 3330,
    "FULL_NAME": "Syria",
    "SM": "5.51",
    "ID": 13
  },
  {
    "DT_CREATE": "29.09.2019",
    "URC": 2292,
    "FULL_NAME": "Jordan",
    "SM": "2.72",
    "ID": 14
  },
  {
    "DT_CREATE": "29.09.2019",
    "URC": 6120,
    "FULL_NAME": "Thailand",
    "SM": "4.78",
    "ID": 15
  },
  {
    "DT_CREATE": "22.01.2020",
    "URC": 5419,
    "FULL_NAME": "Bosnia and Herzegovina",
    "SM": "3.03",
    "ID": 16
  },
  {
    "DT_CREATE": "26.11.2019",
    "URC": 1674,
    "FULL_NAME": "Samoa",
    "SM": "2.84",
    "ID": 17
  },
  {
    "DT_CREATE": "15.10.2019",
    "URC": 407,
    "FULL_NAME": "Guyana",
    "SM": "1.44",
    "ID": 18
  },
  {
    "DT_CREATE": "02.07.2019",
    "URC": 7654,
    "FULL_NAME": "Puerto Rico",
    "SM": "4.19",
    "ID": 19
  },
  {
    "DT_CREATE": "17.04.2019",
    "URC": 6148,
    "FULL_NAME": "Norway",
    "SM": "6.23",
    "ID": 20
  },
  {
    "DT_CREATE": "15.05.2019",
    "URC": 738,
    "FULL_NAME": "Wallis and Futuna",
    "SM": "5.03",
    "ID": 21
  },
  {
    "DT_CREATE": "27.02.2020",
    "URC": 7521,
    "FULL_NAME": "Jamaica",
    "SM": "9.54",
    "ID": 22
  },
  {
    "DT_CREATE": "19.03.2020",
    "URC": 8375,
    "FULL_NAME": "Iran",
    "SM": "4.91",
    "ID": 23
  },
  {
    "DT_CREATE": "27.09.2019",
    "URC": 8761,
    "FULL_NAME": "Angola",
    "SM": "5.36",
    "ID": 24
  },
  {
    "DT_CREATE": "15.03.2020",
    "URC": 7733,
    "FULL_NAME": "Belgium",
    "SM": "5.25",
    "ID": 25
  },
  {
    "DT_CREATE": "23.12.2019",
    "URC": 7573,
    "FULL_NAME": "Côte D'Ivoire (Ivory Coast)",
    "SM": "1.68",
    "ID": 26
  },
  {
    "DT_CREATE": "10.10.2019",
    "URC": 5893,
    "FULL_NAME": "Saint Helena, Ascension and Tristan da Cunha",
    "SM": "4.44",
    "ID": 27
  },
  {
    "DT_CREATE": "08.03.2020",
    "URC": 2263,
    "FULL_NAME": "Mali",
    "SM": "5.91",
    "ID": 28
  },
  {
    "DT_CREATE": "27.03.2019",
    "URC": 4178,
    "FULL_NAME": "Niue",
    "SM": "2.64",
    "ID": 29
  },
  {
    "DT_CREATE": "14.02.2020",
    "URC": 2413,
    "FULL_NAME": "Guinea-Bissau",
    "SM": "5.09",
    "ID": 30
  },
  {
    "DT_CREATE": "03.07.2019",
    "URC": 1170,
    "FULL_NAME": "Guinea",
    "SM": "0.88",
    "ID": 31
  },
  {
    "DT_CREATE": "03.11.2019",
    "URC": 174,
    "FULL_NAME": "Greece",
    "SM": "7.32",
    "ID": 32
  },
  {
    "DT_CREATE": "10.10.2019",
    "URC": 1719,
    "FULL_NAME": "Jordan",
    "SM": "9.90",
    "ID": 33
  },
  {
    "DT_CREATE": "19.05.2019",
    "URC": 9123,
    "FULL_NAME": "Denmark",
    "SM": "2.45",
    "ID": 34
  },
  {
    "DT_CREATE": "19.11.2019",
    "URC": 4437,
    "FULL_NAME": "Nicaragua",
    "SM": "6.06",
    "ID": 35
  },
  {
    "DT_CREATE": "27.09.2019",
    "URC": 2750,
    "FULL_NAME": "Bolivia",
    "SM": "4.30",
    "ID": 36
  },
  {
    "DT_CREATE": "29.06.2019",
    "URC": 3544,
    "FULL_NAME": "Monaco",
    "SM": "6.71",
    "ID": 37
  },
  {
    "DT_CREATE": "11.01.2020",
    "URC": 5356,
    "FULL_NAME": "Brazil",
    "SM": "4.65",
    "ID": 38
  },
  {
    "DT_CREATE": "23.03.2020",
    "URC": 8984,
    "FULL_NAME": "Central African Republic",
    "SM": "9.91",
    "ID": 39
  },
  {
    "DT_CREATE": "05.10.2019",
    "URC": 4977,
    "FULL_NAME": "Netherlands",
    "SM": "0.99",
    "ID": 40
  },
  {
    "DT_CREATE": "16.12.2019",
    "URC": 6572,
    "FULL_NAME": "Dominican Republic",
    "SM": "3.76",
    "ID": 41
  },
  {
    "DT_CREATE": "07.10.2019",
    "URC": 2899,
    "FULL_NAME": "Suriname",
    "SM": "8.32",
    "ID": 42
  },
  {
    "DT_CREATE": "03.09.2019",
    "URC": 9045,
    "FULL_NAME": "Saudi Arabia",
    "SM": "0.61",
    "ID": 43
  },
  {
    "DT_CREATE": "16.07.2019",
    "URC": 3478,
    "FULL_NAME": "Saint Vincent and The Grenadines",
    "SM": "0.65",
    "ID": 44
  },
  {
    "DT_CREATE": "19.09.2019",
    "URC": 9634,
    "FULL_NAME": "Niger",
    "SM": "8.66",
    "ID": 45
  },
  {
    "DT_CREATE": "22.08.2019",
    "URC": 1494,
    "FULL_NAME": "Iran",
    "SM": "4.76",
    "ID": 46
  },
  {
    "DT_CREATE": "13.01.2020",
    "URC": 1964,
    "FULL_NAME": "United Kingdom (Great Britain)",
    "SM": "6.57",
    "ID": 47
  },
  {
    "DT_CREATE": "21.07.2019",
    "URC": 9468,
    "FULL_NAME": "Haiti",
    "SM": "7.68",
    "ID": 48
  },
  {
    "DT_CREATE": "15.04.2019",
    "URC": 8213,
    "FULL_NAME": "Palau",
    "SM": "8.97",
    "ID": 49
  },
  {
    "DT_CREATE": "02.10.2019",
    "URC": 6050,
    "FULL_NAME": "Greece",
    "SM": "9.06",
    "ID": 50
  },
  {
    "DT_CREATE": "28.06.2019",
    "URC": 2465,
    "FULL_NAME": "Timor-Leste",
    "SM": "5.41",
    "ID": 51
  },
  {
    "DT_CREATE": "02.07.2019",
    "URC": 6482,
    "FULL_NAME": "Australia",
    "SM": "0.35",
    "ID": 52
  },
  {
    "DT_CREATE": "30.10.2019",
    "URC": 6256,
    "FULL_NAME": "Aruba",
    "SM": "3.23",
    "ID": 53
  },
  {
    "DT_CREATE": "09.01.2020",
    "URC": 6088,
    "FULL_NAME": "American Samoa",
    "SM": "4.87",
    "ID": 54
  },
  {
    "DT_CREATE": "02.01.2020",
    "URC": 9227,
    "FULL_NAME": "Malaysia",
    "SM": "9.47",
    "ID": 55
  },
  {
    "DT_CREATE": "22.11.2019",
    "URC": 9031,
    "FULL_NAME": "Macedonia",
    "SM": "8.34",
    "ID": 56
  },
  {
    "DT_CREATE": "20.02.2020",
    "URC": 4698,
    "FULL_NAME": "Anguilla",
    "SM": "1.23",
    "ID": 57
  },
  {
    "DT_CREATE": "27.12.2019",
    "URC": 2594,
    "FULL_NAME": "Ecuador",
    "SM": "1.38",
    "ID": 58
  },
  {
    "DT_CREATE": "07.03.2020",
    "URC": 7851,
    "FULL_NAME": "Afghanistan",
    "SM": "2.35",
    "ID": 59
  },
  {
    "DT_CREATE": "22.03.2020",
    "URC": 2375,
    "FULL_NAME": "Congo (Brazzaville)",
    "SM": "3.01",
    "ID": 60
  },
  {
    "DT_CREATE": "03.04.2019",
    "URC": 9002,
    "FULL_NAME": "Vanuatu",
    "SM": "3.49",
    "ID": 61
  },
  {
    "DT_CREATE": "28.02.2020",
    "URC": 8567,
    "FULL_NAME": "Greenland",
    "SM": "7.35",
    "ID": 62
  },
  {
    "DT_CREATE": "21.07.2019",
    "URC": 674,
    "FULL_NAME": "Israel",
    "SM": "0.15",
    "ID": 63
  },
  {
    "DT_CREATE": "19.09.2019",
    "URC": 9178,
    "FULL_NAME": "Faroe Islands",
    "SM": "2.71",
    "ID": 64
  },
  {
    "DT_CREATE": "09.11.2019",
    "URC": 1102,
    "FULL_NAME": "Thailand",
    "SM": "4.58",
    "ID": 65
  },
  {
    "DT_CREATE": "04.05.2019",
    "URC": 6144,
    "FULL_NAME": "Korea, North",
    "SM": "8.48",
    "ID": 66
  },
  {
    "DT_CREATE": "22.01.2020",
    "URC": 1960,
    "FULL_NAME": "Portugal",
    "SM": "8.53",
    "ID": 67
  },
  {
    "DT_CREATE": "04.10.2019",
    "URC": 8513,
    "FULL_NAME": "Lebanon",
    "SM": "0.08",
    "ID": 68
  },
  {
    "DT_CREATE": "15.08.2019",
    "URC": 2758,
    "FULL_NAME": "Christmas Island",
    "SM": "4.36",
    "ID": 69
  },
  {
    "DT_CREATE": "20.09.2019",
    "URC": 5704,
    "FULL_NAME": "New Zealand",
    "SM": "2.64",
    "ID": 70
  },
  {
    "DT_CREATE": "07.04.2019",
    "URC": 6309,
    "FULL_NAME": "Guinea-Bissau",
    "SM": "3.56",
    "ID": 71
  },
  {
    "DT_CREATE": "16.12.2019",
    "URC": 3376,
    "FULL_NAME": "French Southern Territories",
    "SM": "2.68",
    "ID": 72
  },
  {
    "DT_CREATE": "20.08.2019",
    "URC": 2105,
    "FULL_NAME": "Grenada",
    "SM": "8.14",
    "ID": 73
  },
  {
    "DT_CREATE": "04.11.2019",
    "URC": 8575,
    "FULL_NAME": "Saint Lucia",
    "SM": "6.92",
    "ID": 74
  },
  {
    "DT_CREATE": "09.03.2020",
    "URC": 1588,
    "FULL_NAME": "Algeria",
    "SM": "3.64",
    "ID": 75
  },
  {
    "DT_CREATE": "25.01.2020",
    "URC": 497,
    "FULL_NAME": "Liechtenstein",
    "SM": "4.55",
    "ID": 76
  },
  {
    "DT_CREATE": "22.10.2019",
    "URC": 2944,
    "FULL_NAME": "Bulgaria",
    "SM": "8.76",
    "ID": 77
  },
  {
    "DT_CREATE": "29.02.2020",
    "URC": 8492,
    "FULL_NAME": "Martinique",
    "SM": "1.02",
    "ID": 78
  },
  {
    "DT_CREATE": "29.06.2019",
    "URC": 2866,
    "FULL_NAME": "Brazil",
    "SM": "0.16",
    "ID": 79
  },
  {
    "DT_CREATE": "10.03.2020",
    "URC": 2353,
    "FULL_NAME": "Tokelau",
    "SM": "9.10",
    "ID": 80
  },
  {
    "DT_CREATE": "06.09.2019",
    "URC": 3198,
    "FULL_NAME": "Iceland",
    "SM": "7.88",
    "ID": 81
  },
  {
    "DT_CREATE": "15.10.2019",
    "URC": 4409,
    "FULL_NAME": "Monaco",
    "SM": "0.80",
    "ID": 82
  },
  {
    "DT_CREATE": "12.09.2019",
    "URC": 6125,
    "FULL_NAME": "Paraguay",
    "SM": "9.87",
    "ID": 83
  },
  {
    "DT_CREATE": "09.11.2019",
    "URC": 9269,
    "FULL_NAME": "Eritrea",
    "SM": "2.05",
    "ID": 84
  },
  {
    "DT_CREATE": "11.06.2019",
    "URC": 6893,
    "FULL_NAME": "Saint Lucia",
    "SM": "4.89",
    "ID": 85
  },
  {
    "DT_CREATE": "31.01.2020",
    "URC": 884,
    "FULL_NAME": "Mayotte",
    "SM": "3.18",
    "ID": 86
  },
  {
    "DT_CREATE": "01.07.2019",
    "URC": 9194,
    "FULL_NAME": "Vanuatu",
    "SM": "2.44",
    "ID": 87
  },
  {
    "DT_CREATE": "14.08.2019",
    "URC": 1491,
    "FULL_NAME": "Samoa",
    "SM": "2.49",
    "ID": 88
  },
  {
    "DT_CREATE": "22.12.2019",
    "URC": 5709,
    "FULL_NAME": "Bermuda",
    "SM": "2.00",
    "ID": 89
  },
  {
    "DT_CREATE": "05.06.2019",
    "URC": 7814,
    "FULL_NAME": "Mali",
    "SM": "1.45",
    "ID": 90
  },
  {
    "DT_CREATE": "01.05.2019",
    "URC": 36,
    "FULL_NAME": "Jordan",
    "SM": "7.81",
    "ID": 91
  },
  {
    "DT_CREATE": "25.03.2020",
    "URC": 6201,
    "FULL_NAME": "Sri Lanka",
    "SM": "4.60",
    "ID": 92
  },
  {
    "DT_CREATE": "02.04.2019",
    "URC": 4243,
    "FULL_NAME": "Dominica",
    "SM": "7.67",
    "ID": 93
  },
  {
    "DT_CREATE": "24.01.2020",
    "URC": 9122,
    "FULL_NAME": "Sierra Leone",
    "SM": "4.03",
    "ID": 94
  },
  {
    "DT_CREATE": "03.10.2019",
    "URC": 2886,
    "FULL_NAME": "Reunion",
    "SM": "7.68",
    "ID": 95
  },
  {
    "DT_CREATE": "03.11.2019",
    "URC": 6094,
    "FULL_NAME": "Mali",
    "SM": "9.88",
    "ID": 96
  },
  {
    "DT_CREATE": "10.04.2019",
    "URC": 1944,
    "FULL_NAME": "Canada",
    "SM": "0.82",
    "ID": 97
  },
  {
    "DT_CREATE": "02.01.2020",
    "URC": 2950,
    "FULL_NAME": "Sierra Leone",
    "SM": "6.15",
    "ID": 98
  },
  {
    "DT_CREATE": "29.07.2019",
    "URC": 1407,
    "FULL_NAME": "Tuvalu",
    "SM": "9.53",
    "ID": 99
  },
  {
    "DT_CREATE": "22.03.2020",
    "URC": 4960,
    "FULL_NAME": "Somalia",
    "SM": "5.01",
    "ID": 100
  }*/
];
