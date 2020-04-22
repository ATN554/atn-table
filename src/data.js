const columns = [
  {
    title: "Родит. Ид.",
    field: "PARENT_ID",
    type: "integer",
    align: "right",
    width: 150,
    mimWidth: 10,
    maxWidth: 250,
    visibility: {
      visible: false,
    },
  },
  {
    title: "Ид.",
    field: "ID",
    type: "integer",
    align: "left",
    width: 150,
    mimWidth: 10,
    maxWidth: 250,
    visibility: {
      visible: false,
    },
  },
  {
    title: "Сумма",
    field: "SM",
    type: "number",
    align: "right",
    width: 120,
    visibility: {
      visible: false
    },
    group: {
      id: 0,
      locked: true,
    }
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

export const groupColumns = [
  {
    title: "Наименование",
    field: "FULL_NAME",
    width: 250,
    sort: {
      order: "asc",
    },
  },
  ...columns
];

export const treeColumnsStatic = [
  {
    title: "Наименование",
    field: "FULL_NAME",
    width: 250,
    tree: {
      parentField: "PARENT_ID",
      childField: "ID",
      startFrom: 0,
      load: false,
    },
    sort: {
      order: "asc",
    },
  },
  ...columns
];

export const treeColumnsLoad = [
  {
    title: "Наименование",
    field: "FULL_NAME",
    width: 250,
    tree: {
      parentField: "PARENT_ID",
      childField: "ID",
      startFrom: 0,
      load: true,
    },
    sort: {
      order: "asc",
    },
  },
  ...columns
];

export const totals = {
  "First-Column-Text": "Итого: ",
  "SM": "1023.56"
};

export const data = [
  {
    "ID": 1,
    "URC": 5040,
    "FULL_NAME": "Jersey",
    "SM": "0.18",
    "PARENT_ID": 0,
    "DT_CREATE": "04.08.2020"
  },
  {
    "ID": 2,
    "URC": 8872,
    "FULL_NAME": "Saint Kitts and Nevis",
    "SM": "9.45",
    "PARENT_ID": 1,
    "DT_CREATE": "21.08.2019"
  },
  {
    "ID": 3,
    "URC": 5560,
    "FULL_NAME": "Thailand",
    "SM": "8.03",
    "PARENT_ID": 2,
    "DT_CREATE": "28.11.2020"
  },
  {
    "ID": 4,
    "URC": 9089,
    "FULL_NAME": "Congo (Brazzaville)",
    "SM": "4.13",
    "PARENT_ID": 2,
    "DT_CREATE": "29.07.2019"
  },
  {
    "ID": 5,
    "URC": 2399,
    "FULL_NAME": "Montenegro",
    "SM": "4.95",
    "PARENT_ID": 1,
    "DT_CREATE": "30.01.2020"
  },
  {
    "ID": 6,
    "URC": 3234,
    "FULL_NAME": "Puerto Rico",
    "SM": "5.91",
    "PARENT_ID": 5,
    "DT_CREATE": "04.01.2020"
  },
  {
    "ID": 7,
    "URC": 5486,
    "FULL_NAME": "Papua New Guinea",
    "SM": "5.95",
    "PARENT_ID": 2,
    "DT_CREATE": "12.01.2020"
  },
  {
    "ID": 8,
    "URC": 2056,
    "FULL_NAME": "Romania",
    "SM": "2.58",
    "PARENT_ID": 4,
    "DT_CREATE": "20.11.2019"
  },
  {
    "ID": 9,
    "URC": 6549,
    "FULL_NAME": "Bulgaria",
    "SM": "2.46",
    "PARENT_ID": 1,
    "DT_CREATE": "31.05.2020"
  },
  {
    "ID": 10,
    "URC": 7046,
    "FULL_NAME": "Mayotte",
    "SM": "7.61",
    "PARENT_ID": 5,
    "DT_CREATE": "07.10.2019"
  },
  {
    "ID": 11,
    "URC": 1306,
    "FULL_NAME": "Uganda",
    "SM": "0.03",
    "PARENT_ID": 2,
    "DT_CREATE": "07.05.2019"
  },
  {
    "ID": 12,
    "URC": 5035,
    "FULL_NAME": "South Sudan",
    "SM": "8.42",
    "PARENT_ID": 11,
    "DT_CREATE": "15.06.2019"
  },
  {
    "ID": 13,
    "URC": 7245,
    "FULL_NAME": "Guam",
    "SM": "2.76",
    "PARENT_ID": 7,
    "DT_CREATE": "01.02.2020"
  },
  {
    "ID": 14,
    "URC": 7799,
    "FULL_NAME": "Turkey",
    "SM": "3.04",
    "PARENT_ID": 9,
    "DT_CREATE": "15.10.2020"
  },
  {
    "ID": 15,
    "URC": 9058,
    "FULL_NAME": "Cameroon",
    "SM": "9.82",
    "PARENT_ID": 13,
    "DT_CREATE": "13.02.2021"
  },
  {
    "ID": 16,
    "URC": 1096,
    "FULL_NAME": "Sierra Leone",
    "SM": "5.35",
    "PARENT_ID": 9,
    "DT_CREATE": "16.07.2020"
  },
  {
    "ID": 17,
    "URC": 1186,
    "FULL_NAME": "Greece",
    "SM": "3.51",
    "PARENT_ID": 1,
    "DT_CREATE": "10.06.2020"
  },
  {
    "ID": 18,
    "URC": 8419,
    "FULL_NAME": "Ghana",
    "SM": "4.14",
    "PARENT_ID": 4,
    "DT_CREATE": "18.09.2019"
  },
  {
    "ID": 19,
    "URC": 1863,
    "FULL_NAME": "United Arab Emirates",
    "SM": "7.67",
    "PARENT_ID": 4,
    "DT_CREATE": "03.11.2019"
  },
  {
    "ID": 20,
    "URC": 2540,
    "FULL_NAME": "China",
    "SM": "9.52",
    "PARENT_ID": 6,
    "DT_CREATE": "21.02.2021"
  },
  {
    "ID": 21,
    "URC": 6863,
    "FULL_NAME": "Sint Maarten",
    "SM": "6.44",
    "PARENT_ID": 18,
    "DT_CREATE": "17.10.2020"
  },
  {
    "ID": 22,
    "URC": 8363,
    "FULL_NAME": "Singapore",
    "SM": "6.27",
    "PARENT_ID": 17,
    "DT_CREATE": "24.11.2019"
  },
  {
    "ID": 23,
    "URC": 2355,
    "FULL_NAME": "Poland",
    "SM": "7.19",
    "PARENT_ID": 3,
    "DT_CREATE": "17.06.2020"
  },
  {
    "ID": 24,
    "URC": 6248,
    "FULL_NAME": "Solomon Islands",
    "SM": "7.86",
    "PARENT_ID": 4,
    "DT_CREATE": "27.11.2020"
  },
  {
    "ID": 25,
    "URC": 8317,
    "FULL_NAME": "Eritrea",
    "SM": "6.99",
    "PARENT_ID": 4,
    "DT_CREATE": "17.03.2021"
  },
  {
    "ID": 26,
    "URC": 5707,
    "FULL_NAME": "French Polynesia",
    "SM": "6.18",
    "PARENT_ID": 23,
    "DT_CREATE": "26.10.2020"
  },
  {
    "ID": 27,
    "URC": 1253,
    "FULL_NAME": "Lesotho",
    "SM": "9.99",
    "PARENT_ID": 6,
    "DT_CREATE": "11.01.2021"
  },
  {
    "ID": 28,
    "URC": 8604,
    "FULL_NAME": "Switzerland",
    "SM": "4.01",
    "PARENT_ID": 23,
    "DT_CREATE": "28.05.2020"
  },
  {
    "ID": 29,
    "URC": 6174,
    "FULL_NAME": "Gibraltar",
    "SM": "9.14",
    "PARENT_ID": 9,
    "DT_CREATE": "20.01.2021"
  },
  {
    "ID": 30,
    "URC": 8204,
    "FULL_NAME": "Fiji",
    "SM": "1.85",
    "PARENT_ID": 27,
    "DT_CREATE": "25.09.2019"
  },
  {
    "ID": 31,
    "URC": 2677,
    "FULL_NAME": "Greece",
    "SM": "6.12",
    "PARENT_ID": 1,
    "DT_CREATE": "23.09.2019"
  },
  {
    "ID": 32,
    "URC": 8286,
    "FULL_NAME": "Christmas Island",
    "SM": "5.56",
    "PARENT_ID": 14,
    "DT_CREATE": "20.10.2019"
  },
  {
    "ID": 33,
    "URC": 7088,
    "FULL_NAME": "Kazakhstan",
    "SM": "9.25",
    "PARENT_ID": 22,
    "DT_CREATE": "18.07.2020"
  },
  {
    "ID": 34,
    "URC": 5683,
    "FULL_NAME": "Ethiopia",
    "SM": "9.27",
    "PARENT_ID": 8,
    "DT_CREATE": "17.12.2019"
  },
  {
    "ID": 35,
    "URC": 9893,
    "FULL_NAME": "Holy See (Vatican City State)",
    "SM": "6.94",
    "PARENT_ID": 8,
    "DT_CREATE": "28.07.2019"
  },
  {
    "ID": 36,
    "URC": 4354,
    "FULL_NAME": "Serbia",
    "SM": "1.32",
    "PARENT_ID": 27,
    "DT_CREATE": "02.12.2020"
  },
  {
    "ID": 37,
    "URC": 5402,
    "FULL_NAME": "Egypt",
    "SM": "8.21",
    "PARENT_ID": 21,
    "DT_CREATE": "18.02.2020"
  },
  {
    "ID": 38,
    "URC": 9777,
    "FULL_NAME": "Tajikistan",
    "SM": "3.24",
    "PARENT_ID": 33,
    "DT_CREATE": "21.02.2021"
  },
  {
    "ID": 39,
    "URC": 7731,
    "FULL_NAME": "Holy See (Vatican City State)",
    "SM": "4.90",
    "PARENT_ID": 33,
    "DT_CREATE": "20.08.2020"
  },
  {
    "ID": 40,
    "URC": 9784,
    "FULL_NAME": "Nicaragua",
    "SM": "5.89",
    "PARENT_ID": 34,
    "DT_CREATE": "29.02.2020"
  },
  {
    "ID": 41,
    "URC": 2574,
    "FULL_NAME": "United States Minor Outlying Islands",
    "SM": "9.29",
    "PARENT_ID": 20,
    "DT_CREATE": "30.12.2019"
  },
  {
    "ID": 42,
    "URC": 6886,
    "FULL_NAME": "Kiribati",
    "SM": "6.98",
    "PARENT_ID": 25,
    "DT_CREATE": "31.05.2019"
  },
  {
    "ID": 43,
    "URC": 9427,
    "FULL_NAME": "France",
    "SM": "9.23",
    "PARENT_ID": 14,
    "DT_CREATE": "22.11.2019"
  },
  {
    "ID": 44,
    "URC": 2004,
    "FULL_NAME": "Palau",
    "SM": "0.75",
    "PARENT_ID": 41,
    "DT_CREATE": "14.06.2020"
  },
  {
    "ID": 45,
    "URC": 4285,
    "FULL_NAME": "Cuba",
    "SM": "9.12",
    "PARENT_ID": 3,
    "DT_CREATE": "20.03.2020"
  },
  {
    "ID": 46,
    "URC": 6753,
    "FULL_NAME": "Comoros",
    "SM": "8.37",
    "PARENT_ID": 8,
    "DT_CREATE": "09.08.2020"
  },
  {
    "ID": 47,
    "URC": 4872,
    "FULL_NAME": "Kyrgyzstan",
    "SM": "1.53",
    "PARENT_ID": 45,
    "DT_CREATE": "12.09.2019"
  },
  {
    "ID": 48,
    "URC": 8772,
    "FULL_NAME": "Isle of Man",
    "SM": "4.78",
    "PARENT_ID": 30,
    "DT_CREATE": "16.11.2020"
  },
  {
    "ID": 49,
    "URC": 8672,
    "FULL_NAME": "Gabon",
    "SM": "7.03",
    "PARENT_ID": 18,
    "DT_CREATE": "04.12.2019"
  },
  {
    "ID": 50,
    "URC": 9854,
    "FULL_NAME": "Ireland",
    "SM": "7.69",
    "PARENT_ID": 15,
    "DT_CREATE": "23.03.2021"
  },
  {
    "ID": 51,
    "URC": 3914,
    "FULL_NAME": "Liechtenstein",
    "SM": "3.71",
    "PARENT_ID": 24,
    "DT_CREATE": "07.04.2021"
  },
  {
    "ID": 52,
    "URC": 6513,
    "FULL_NAME": "Wallis and Futuna",
    "SM": "2.78",
    "PARENT_ID": 49,
    "DT_CREATE": "14.03.2020"
  },
  {
    "ID": 53,
    "URC": 6429,
    "FULL_NAME": "Albania",
    "SM": "6.43",
    "PARENT_ID": 45,
    "DT_CREATE": "29.02.2020"
  },
  {
    "ID": 54,
    "URC": 3270,
    "FULL_NAME": "Syria",
    "SM": "9.14",
    "PARENT_ID": 36,
    "DT_CREATE": "07.02.2020"
  },
  {
    "ID": 55,
    "URC": 3216,
    "FULL_NAME": "Curaçao",
    "SM": "9.21",
    "PARENT_ID": 44,
    "DT_CREATE": "07.02.2021"
  },
  {
    "ID": 56,
    "URC": 8439,
    "FULL_NAME": "Turkey",
    "SM": "7.63",
    "PARENT_ID": 19,
    "DT_CREATE": "10.01.2020"
  },
  {
    "ID": 57,
    "URC": 2300,
    "FULL_NAME": "El Salvador",
    "SM": "1.17",
    "PARENT_ID": 23,
    "DT_CREATE": "02.12.2019"
  },
  {
    "ID": 58,
    "URC": 5671,
    "FULL_NAME": "Saint Barthélemy",
    "SM": "5.78",
    "PARENT_ID": 7,
    "DT_CREATE": "29.08.2019"
  },
  {
    "ID": 59,
    "URC": 5219,
    "FULL_NAME": "Germany",
    "SM": "5.40",
    "PARENT_ID": 6,
    "DT_CREATE": "06.10.2020"
  },
  {
    "ID": 60,
    "URC": 2582,
    "FULL_NAME": "Portugal",
    "SM": "1.43",
    "PARENT_ID": 55,
    "DT_CREATE": "28.11.2019"
  },
  {
    "ID": 61,
    "URC": 2681,
    "FULL_NAME": "Thailand",
    "SM": "5.86",
    "PARENT_ID": 47,
    "DT_CREATE": "26.06.2019"
  },
  {
    "ID": 62,
    "URC": 5078,
    "FULL_NAME": "Belgium",
    "SM": "1.47",
    "PARENT_ID": 47,
    "DT_CREATE": "01.02.2021"
  },
  {
    "ID": 63,
    "URC": 3532,
    "FULL_NAME": "Dominica",
    "SM": "7.66",
    "PARENT_ID": 59,
    "DT_CREATE": "16.09.2020"
  },
  {
    "ID": 64,
    "URC": 2020,
    "FULL_NAME": "Holy See (Vatican City State)",
    "SM": "5.38",
    "PARENT_ID": 58,
    "DT_CREATE": "18.04.2019"
  },
  {
    "ID": 65,
    "URC": 7870,
    "FULL_NAME": "Barbados",
    "SM": "1.87",
    "PARENT_ID": 56,
    "DT_CREATE": "04.05.2019"
  },
  {
    "ID": 66,
    "URC": 5357,
    "FULL_NAME": "Côte D'Ivoire (Ivory Coast)",
    "SM": "0.59",
    "PARENT_ID": 17,
    "DT_CREATE": "27.08.2020"
  },
  {
    "ID": 67,
    "URC": 9624,
    "FULL_NAME": "Marshall Islands",
    "SM": "1.38",
    "PARENT_ID": 55,
    "DT_CREATE": "25.08.2020"
  },
  {
    "ID": 68,
    "URC": 9280,
    "FULL_NAME": "Hungary",
    "SM": "9.41",
    "PARENT_ID": 16,
    "DT_CREATE": "07.03.2020"
  },
  {
    "ID": 69,
    "URC": 7953,
    "FULL_NAME": "Israel",
    "SM": "6.85",
    "PARENT_ID": 0,
    "DT_CREATE": "03.10.2019"
  },
  {
    "ID": 70,
    "URC": 1553,
    "FULL_NAME": "Curaçao",
    "SM": "9.85",
    "PARENT_ID": 39,
    "DT_CREATE": "05.04.2020"
  },
  {
    "ID": 71,
    "URC": 4619,
    "FULL_NAME": "United Kingdom (Great Britain)",
    "SM": "2.77",
    "PARENT_ID": 5,
    "DT_CREATE": "22.01.2020"
  },
  {
    "ID": 72,
    "URC": 4694,
    "FULL_NAME": "Swaziland",
    "SM": "5.55",
    "PARENT_ID": 18,
    "DT_CREATE": "27.12.2020"
  },
  {
    "ID": 73,
    "URC": 2869,
    "FULL_NAME": "Thailand",
    "SM": "8.14",
    "PARENT_ID": 63,
    "DT_CREATE": "30.09.2019"
  },
  {
    "ID": 74,
    "URC": 8142,
    "FULL_NAME": "Andorra",
    "SM": "3.50",
    "PARENT_ID": 2,
    "DT_CREATE": "28.06.2019"
  },
  {
    "ID": 75,
    "URC": 2244,
    "FULL_NAME": "Sint Maarten",
    "SM": "7.78",
    "PARENT_ID": 47,
    "DT_CREATE": "10.10.2020"
  },
  {
    "ID": 76,
    "URC": 9372,
    "FULL_NAME": "Honduras",
    "SM": "6.84",
    "PARENT_ID": 24,
    "DT_CREATE": "11.12.2020"
  },
  {
    "ID": 77,
    "URC": 7722,
    "FULL_NAME": "Congo (Brazzaville)",
    "SM": "0.50",
    "PARENT_ID": 33,
    "DT_CREATE": "06.12.2020"
  },
  {
    "ID": 78,
    "URC": 1782,
    "FULL_NAME": "Honduras",
    "SM": "7.61",
    "PARENT_ID": 69,
    "DT_CREATE": "23.06.2019"
  },
  {
    "ID": 79,
    "URC": 7815,
    "FULL_NAME": "Wallis and Futuna",
    "SM": "4.15",
    "PARENT_ID": 5,
    "DT_CREATE": "15.06.2019"
  },
  {
    "ID": 80,
    "URC": 8631,
    "FULL_NAME": "Slovenia",
    "SM": "8.39",
    "PARENT_ID": 44,
    "DT_CREATE": "03.04.2021"
  },
  {
    "ID": 81,
    "URC": 4610,
    "FULL_NAME": "Chad",
    "SM": "2.39",
    "PARENT_ID": 60,
    "DT_CREATE": "06.05.2019"
  },
  {
    "ID": 82,
    "URC": 7298,
    "FULL_NAME": "Malawi",
    "SM": "3.77",
    "PARENT_ID": 42,
    "DT_CREATE": "02.12.2019"
  },
  {
    "ID": 83,
    "URC": 4888,
    "FULL_NAME": "Martinique",
    "SM": "4.54",
    "PARENT_ID": 43,
    "DT_CREATE": "05.01.2021"
  },
  {
    "ID": 84,
    "URC": 4095,
    "FULL_NAME": "Isle of Man",
    "SM": "0.22",
    "PARENT_ID": 38,
    "DT_CREATE": "15.12.2019"
  },
  {
    "ID": 85,
    "URC": 1311,
    "FULL_NAME": "Reunion",
    "SM": "8.23",
    "PARENT_ID": 24,
    "DT_CREATE": "11.02.2020"
  },
  {
    "ID": 86,
    "URC": 7181,
    "FULL_NAME": "Virgin Islands, United States",
    "SM": "9.84",
    "PARENT_ID": 54,
    "DT_CREATE": "24.08.2019"
  },
  {
    "ID": 87,
    "URC": 3353,
    "FULL_NAME": "Greece",
    "SM": "1.57",
    "PARENT_ID": 66,
    "DT_CREATE": "31.03.2021"
  },
  {
    "ID": 88,
    "URC": 7904,
    "FULL_NAME": "Faroe Islands",
    "SM": "4.56",
    "PARENT_ID": 62,
    "DT_CREATE": "16.10.2019"
  },
  {
    "ID": 89,
    "URC": 7073,
    "FULL_NAME": "Chile",
    "SM": "3.76",
    "PARENT_ID": 60,
    "DT_CREATE": "15.02.2020"
  },
  {
    "ID": 90,
    "URC": 7344,
    "FULL_NAME": "Denmark",
    "SM": "2.03",
    "PARENT_ID": 19,
    "DT_CREATE": "30.12.2019"
  },
  {
    "ID": 91,
    "URC": 8791,
    "FULL_NAME": "Iraq",
    "SM": "4.10",
    "PARENT_ID": 0,
    "DT_CREATE": "15.07.2019"
  },
  {
    "ID": 92,
    "URC": 7668,
    "FULL_NAME": "Botswana",
    "SM": "2.94",
    "PARENT_ID": 50,
    "DT_CREATE": "18.11.2019"
  },
  {
    "ID": 93,
    "URC": 6949,
    "FULL_NAME": "Chile",
    "SM": "2.29",
    "PARENT_ID": 84,
    "DT_CREATE": "15.02.2020"
  },
  {
    "ID": 94,
    "URC": 6829,
    "FULL_NAME": "Solomon Islands",
    "SM": "7.56",
    "PARENT_ID": 78,
    "DT_CREATE": "08.06.2019"
  },
  {
    "ID": 95,
    "URC": 6560,
    "FULL_NAME": "Slovenia",
    "SM": "5.97",
    "PARENT_ID": 74,
    "DT_CREATE": "09.02.2021"
  },
  {
    "ID": 96,
    "URC": 3279,
    "FULL_NAME": "Isle of Man",
    "SM": "7.85",
    "PARENT_ID": 33,
    "DT_CREATE": "03.10.2019"
  },
  {
    "ID": 97,
    "URC": 6928,
    "FULL_NAME": "Falkland Islands",
    "SM": "3.17",
    "PARENT_ID": 54,
    "DT_CREATE": "09.12.2019"
  },
  {
    "ID": 98,
    "URC": 1178,
    "FULL_NAME": "Kenya",
    "SM": "8.39",
    "PARENT_ID": 93,
    "DT_CREATE": "29.07.2019"
  },
  {
    "ID": 99,
    "URC": 8723,
    "FULL_NAME": "Madagascar",
    "SM": "4.07",
    "PARENT_ID": 48,
    "DT_CREATE": "29.05.2020"
  },
  {
    "ID": 100,
    "URC": 9644,
    "FULL_NAME": "Tonga",
    "SM": "1.83",
    "PARENT_ID": 17,
    "DT_CREATE": "12.03.2020"
  }
];