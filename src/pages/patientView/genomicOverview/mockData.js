const data = [
  [
    {
      sample: "TCGA-24-2024-01",
      chr: "23",
      start: 43657865,
      end: 154905589,
      numProbes: 45307,
      value: 0.001
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "23",
      start: 43656384,
      end: 43657852,
      numProbes: 2,
      value: -3.8329
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "23",
      start: 16501627,
      end: 43652316,
      numProbes: 12696,
      value: -0.0036
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "23",
      start: 16432819,
      end: 16501253,
      numProbes: 35,
      value: -3.139
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "23",
      start: 3157107,
      end: 16432500,
      numProbes: 5189,
      value: -0.0161
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "22",
      start: 37993126,
      end: 49331012,
      numProbes: 6810,
      value: 0.2338
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "22",
      start: 37977179,
      end: 37990078,
      numProbes: 10,
      value: -0.6727
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "22",
      start: 29465642,
      end: 37971766,
      numProbes: 5567,
      value: 0.2428
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "22",
      start: 29357926,
      end: 29459732,
      numProbes: 91,
      value: 0.7707
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "22",
      start: 17423930,
      end: 29355821,
      numProbes: 4401,
      value: 0.2322
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "21",
      start: 47527681,
      end: 47678774,
      numProbes: 70,
      value: 0.6043
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "21",
      start: 35940832,
      end: 47527508,
      numProbes: 7464,
      value: 0.1511
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "21",
      start: 35937190,
      end: 35938325,
      numProbes: 4,
      value: -1.1603
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "21",
      start: 31650579,
      end: 35937072,
      numProbes: 2549,
      value: 0.1662
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "21",
      start: 31640228,
      end: 31643037,
      numProbes: 6,
      value: -0.7478
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "21",
      start: 15347621,
      end: 31638959,
      numProbes: 10421,
      value: 0.1906
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "20",
      start: 55289145,
      end: 62219837,
      numProbes: 4534,
      value: 0.7728
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "20",
      start: 54895876,
      end: 55287439,
      numProbes: 252,
      value: 0.2763
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "20",
      start: 54889510,
      end: 54889859,
      numProbes: 2,
      value: -1.1488
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "20",
      start: 50699043,
      end: 54888985,
      numProbes: 3026,
      value: 0.253
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "20",
      start: 50683910,
      end: 50695849,
      numProbes: 12,
      value: 0.9252
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "20",
      start: 16088321,
      end: 50682615,
      numProbes: 19555,
      value: 0.222
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "20",
      start: 16079006,
      end: 16084944,
      numProbes: 3,
      value: -0.7763
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "20",
      start: 16009795,
      end: 16078803,
      numProbes: 73,
      value: 0.1612
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "20",
      start: 16008011,
      end: 16009257,
      numProbes: 4,
      value: -0.8311
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "20",
      start: 12763139,
      end: 16007501,
      numProbes: 1850,
      value: 0.242
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "20",
      start: 12757713,
      end: 12761379,
      numProbes: 4,
      value: -0.7483
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "20",
      start: 11515533,
      end: 12751391,
      numProbes: 842,
      value: 0.2548
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "20",
      start: 11504274,
      end: 11514978,
      numProbes: 9,
      value: -0.7358
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "20",
      start: 455764,
      end: 11501142,
      numProbes: 6983,
      value: 0.2505
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "19",
      start: 53778339,
      end: 58878226,
      numProbes: 2202,
      value: -0.6708
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "19",
      start: 53777270,
      end: 53778199,
      numProbes: 5,
      value: -3.0977
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "19",
      start: 46652781,
      end: 53777198,
      numProbes: 2709,
      value: -0.6668
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "19",
      start: 40465403,
      end: 46650570,
      numProbes: 2498,
      value: 0.2273
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "19",
      start: 40458136,
      end: 40464877,
      numProbes: 2,
      value: -1.4056
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "19",
      start: 9078190,
      end: 40455082,
      numProbes: 13652,
      value: 0.225
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "19",
      start: 284018,
      end: 9077436,
      numProbes: 2715,
      value: -0.6673
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "18",
      start: 72819403,
      end: 77109240,
      numProbes: 2768,
      value: -0.7803
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "18",
      start: 72816432,
      end: 72816792,
      numProbes: 2,
      value: -4.2813
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "18",
      start: 54746156,
      end: 72815890,
      numProbes: 9289,
      value: -0.6938
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "18",
      start: 54744144,
      end: 54745406,
      numProbes: 3,
      value: -3.8705
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "18",
      start: 47600795,
      end: 54741641,
      numProbes: 4475,
      value: -0.7011
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "18",
      start: 34411777,
      end: 47595962,
      numProbes: 8135,
      value: 0.2272
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "18",
      start: 34411076,
      end: 34411683,
      numProbes: 7,
      value: -0.7072
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "18",
      start: 30491195,
      end: 34404924,
      numProbes: 2371,
      value: 0.2241
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "18",
      start: 30478933,
      end: 30490280,
      numProbes: 12,
      value: -0.4928
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "18",
      start: 329586,
      end: 30474276,
      numProbes: 15332,
      value: 0.2442
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 77247212,
      end: 80917016,
      numProbes: 1407,
      value: 0.7418
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 77241410,
      end: 77241949,
      numProbes: 5,
      value: -1.0674
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 76483338,
      end: 77237483,
      numProbes: 298,
      value: 0.7671
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 76471679,
      end: 76472976,
      numProbes: 5,
      value: 1.9059
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 75236950,
      end: 76471268,
      numProbes: 539,
      value: 0.7771
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 75217179,
      end: 75235908,
      numProbes: 12,
      value: 1.689
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 66837642,
      end: 75215486,
      numProbes: 4710,
      value: 0.7873
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 66836099,
      end: 66837397,
      numProbes: 4,
      value: -1.18
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 60801044,
      end: 66835832,
      numProbes: 3285,
      value: 0.7837
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 59424239,
      end: 60796099,
      numProbes: 633,
      value: 0.2047
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 59423420,
      end: 59423815,
      numProbes: 2,
      value: -2.4517
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 46989154,
      end: 59421940,
      numProbes: 7090,
      value: 0.2315
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 29671387,
      end: 46988597,
      numProbes: 7340,
      value: -0.6851
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 29668808,
      end: 29671327,
      numProbes: 3,
      value: -5.3267
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 19645901,
      end: 29668664,
      numProbes: 2377,
      value: -0.66
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 19643016,
      end: 19645245,
      numProbes: 3,
      value: -2.4935
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 19404091,
      end: 19642952,
      numProbes: 112,
      value: -0.6656
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 19397455,
      end: 19402097,
      numProbes: 6,
      value: -4.4334
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 10383994,
      end: 19390096,
      numProbes: 4104,
      value: -0.697
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 9788769,
      end: 10379289,
      numProbes: 336,
      value: 0.2504
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 9788218,
      end: 9788251,
      numProbes: 2,
      value: 2.0012
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 7762637,
      end: 9787468,
      numProbes: 1248,
      value: 0.2294
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 7754460,
      end: 7757313,
      numProbes: 2,
      value: -3.1445
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "17",
      start: 987221,
      end: 7753140,
      numProbes: 3205,
      value: 0.24
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "16",
      start: 85997281,
      end: 89379936,
      numProbes: 1784,
      value: -0.7937
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "16",
      start: 85994520,
      end: 85996295,
      numProbes: 3,
      value: -4.8393
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "16",
      start: 83862600,
      end: 85993580,
      numProbes: 719,
      value: -0.7994
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "16",
      start: 83857789,
      end: 83861617,
      numProbes: 4,
      value: -6.3381
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "16",
      start: 83767219,
      end: 83856512,
      numProbes: 145,
      value: -0.6863
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "16",
      start: 83767112,
      end: 83767133,
      numProbes: 2,
      value: -3.7654
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "16",
      start: 80779563,
      end: 83766808,
      numProbes: 2396,
      value: -0.7461
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "16",
      start: 80779076,
      end: 80779197,
      numProbes: 3,
      value: -4.2752
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "16",
      start: 50731096,
      end: 80778706,
      numProbes: 19135,
      value: -0.6901
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "16",
      start: 50730865,
      end: 50730881,
      numProbes: 2,
      value: -6.0352
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "16",
      start: 48153165,
      end: 50726262,
      numProbes: 1667,
      value: -0.7152
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "16",
      start: 1007268,
      end: 48148756,
      numProbes: 14413,
      value: 0.2426
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "16",
      start: 1005360,
      end: 1005666,
      numProbes: 2,
      value: -2.1781
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "16",
      start: 653459,
      end: 1004694,
      numProbes: 64,
      value: 0.2524
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "15",
      start: 77918702,
      end: 101884307,
      numProbes: 14059,
      value: 0.2201
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "15",
      start: 72034649,
      end: 77912408,
      numProbes: 2755,
      value: -0.6969
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "15",
      start: 23687685,
      end: 72033321,
      numProbes: 27549,
      value: 0.2317
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "14",
      start: 104050792,
      end: 105988038,
      numProbes: 571,
      value: 0.2141
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "14",
      start: 104047702,
      end: 104047757,
      numProbes: 3,
      value: -1.1989
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "14",
      start: 95420055,
      end: 104047122,
      numProbes: 5436,
      value: 0.2204
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "14",
      start: 95416598,
      end: 95417563,
      numProbes: 3,
      value: -1.2993
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "14",
      start: 84013477,
      end: 95415113,
      numProbes: 7059,
      value: 0.2324
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "14",
      start: 32464312,
      end: 84010872,
      numProbes: 30017,
      value: -0.6961
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "14",
      start: 32452629,
      end: 32456358,
      numProbes: 7,
      value: -6.4466
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "14",
      start: 22083365,
      end: 32452378,
      numProbes: 5013,
      value: -0.6846
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "14",
      start: 20501368,
      end: 22082606,
      numProbes: 863,
      value: 0.2439
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "13",
      start: 114246355,
      end: 114987458,
      numProbes: 141,
      value: 0.7791
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "13",
      start: 110604680,
      end: 114245861,
      numProbes: 2117,
      value: 0.2025
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "13",
      start: 27457376,
      end: 110600254,
      numProbes: 49522,
      value: -0.6953
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "13",
      start: 27455416,
      end: 27456768,
      numProbes: 4,
      value: -5.0616
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "13",
      start: 21911278,
      end: 27455339,
      numProbes: 3285,
      value: -0.7199
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "13",
      start: 21907495,
      end: 21911143,
      numProbes: 5,
      value: -3.3075
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "13",
      start: 19734310,
      end: 21907172,
      numProbes: 742,
      value: -0.6964
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "13",
      start: 19732017,
      end: 19733849,
      numProbes: 5,
      value: -2.0104
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "13",
      start: 19450806,
      end: 19731876,
      numProbes: 193,
      value: -0.7024
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "12",
      start: 110132304,
      end: 133161346,
      numProbes: 12013,
      value: 0.2227
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "12",
      start: 110123478,
      end: 110127439,
      numProbes: 5,
      value: -1.1275
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "12",
      start: 75187700,
      end: 110122326,
      numProbes: 21760,
      value: 0.2105
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "12",
      start: 75185912,
      end: 75186314,
      numProbes: 3,
      value: -2.2662
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "12",
      start: 50548328,
      end: 75179421,
      numProbes: 14319,
      value: 0.215
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "12",
      start: 50375648,
      end: 50547607,
      numProbes: 89,
      value: 0.7632
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "12",
      start: 22868305,
      end: 50372026,
      numProbes: 12908,
      value: 0.2142
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "12",
      start: 22866862,
      end: 22868165,
      numProbes: 6,
      value: -1.276
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "12",
      start: 11356080,
      end: 22865243,
      numProbes: 7111,
      value: 0.2167
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "12",
      start: 889902,
      end: 11152443,
      numProbes: 5517,
      value: 0.7603
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "11",
      start: 99883154,
      end: 134142530,
      numProbes: 22728,
      value: 0.2133
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "11",
      start: 99882392,
      end: 99883092,
      numProbes: 2,
      value: -1.6296
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "11",
      start: 69988895,
      end: 99882216,
      numProbes: 17659,
      value: 0.2128
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "11",
      start: 69973982,
      end: 69985223,
      numProbes: 10,
      value: -1.0153
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "11",
      start: 49462367,
      end: 69972079,
      numProbes: 6411,
      value: 0.2114
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "11",
      start: 49434739,
      end: 49459219,
      numProbes: 13,
      value: 1.4942
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "11",
      start: 41718075,
      end: 49432485,
      numProbes: 4107,
      value: 0.2165
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "11",
      start: 41683975,
      end: 41714503,
      numProbes: 17,
      value: -0.2813
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "11",
      start: 8974357,
      end: 41683364,
      numProbes: 21490,
      value: 0.2215
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "11",
      start: 8966388,
      end: 8972645,
      numProbes: 9,
      value: -0.7575
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "11",
      start: 456120,
      end: 8957970,
      numProbes: 4536,
      value: 0.2022
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 130265278,
      end: 135225087,
      numProbes: 2182,
      value: 0.7919
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 130262934,
      end: 130262998,
      numProbes: 3,
      value: -0.7388
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 125868241,
      end: 130262918,
      numProbes: 3066,
      value: 0.7877
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 121782814,
      end: 125863535,
      numProbes: 3264,
      value: 0.2139
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 121780861,
      end: 121781935,
      numProbes: 4,
      value: -1.5035
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 115730237,
      end: 121778291,
      numProbes: 3983,
      value: 0.2264
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 115727348,
      end: 115729327,
      numProbes: 3,
      value: -2.8661
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 110193416,
      end: 115727283,
      numProbes: 3689,
      value: 0.2125
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 108428264,
      end: 110191034,
      numProbes: 1207,
      value: -0.6901
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 108427122,
      end: 108427644,
      numProbes: 2,
      value: -7.0718
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 107305066,
      end: 108425019,
      numProbes: 723,
      value: -0.7233
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 107299745,
      end: 107301067,
      numProbes: 2,
      value: -5.2964
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 89166468,
      end: 107299192,
      numProbes: 10599,
      value: -0.706
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 78329131,
      end: 88868671,
      numProbes: 7013,
      value: 0.2352
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 78312803,
      end: 78321443,
      numProbes: 13,
      value: -0.7084
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 22421698,
      end: 78311287,
      numProbes: 29233,
      value: 0.2389
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 21390298,
      end: 22413053,
      numProbes: 469,
      value: -0.6934
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 21378085,
      end: 21384152,
      numProbes: 5,
      value: -3.5129
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 16813456,
      end: 21377866,
      numProbes: 3144,
      value: -0.686
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 16803947,
      end: 16812244,
      numProbes: 13,
      value: -1.5785
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 9361364,
      end: 16800118,
      numProbes: 5548,
      value: -0.7072
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 9355284,
      end: 9357949,
      numProbes: 8,
      value: -6.1968
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 5636626,
      end: 9353777,
      numProbes: 2858,
      value: -0.7102
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 5624038,
      end: 5635591,
      numProbes: 6,
      value: -3.0768
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 3983483,
      end: 5623837,
      numProbes: 1279,
      value: -0.7413
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 3972077,
      end: 3980337,
      numProbes: 4,
      value: -3.0515
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "10",
      start: 415240,
      end: 3971879,
      numProbes: 1978,
      value: -0.7595
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 137733844,
      end: 140938752,
      numProbes: 1028,
      value: -0.7643
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 137722644,
      end: 137732458,
      numProbes: 3,
      value: -4.5388
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 113356463,
      end: 137722170,
      numProbes: 15136,
      value: -0.7149
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 113355602,
      end: 113355719,
      numProbes: 3,
      value: -3.3229
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 100162417,
      end: 113353357,
      numProbes: 8610,
      value: -0.6886
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 100156757,
      end: 100161757,
      numProbes: 4,
      value: -3.4709
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 96063776,
      end: 100156312,
      numProbes: 2509,
      value: -0.6947
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 96053440,
      end: 96063690,
      numProbes: 6,
      value: -3.1223
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 78424837,
      end: 96052896,
      numProbes: 11807,
      value: -0.6953
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 71039044,
      end: 78420242,
      numProbes: 5053,
      value: 0.2515
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 21806564,
      end: 38747688,
      numProbes: 9858,
      value: -0.7006
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 21801319,
      end: 21801530,
      numProbes: 2,
      value: -3.7177
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 12790630,
      end: 21800513,
      numProbes: 6953,
      value: -0.6992
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 12780295,
      end: 12790501,
      numProbes: 4,
      value: -3.5431
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "9",
      start: 789932,
      end: 12776840,
      numProbes: 6275,
      value: -0.7064
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 87667954,
      end: 145232496,
      numProbes: 34128,
      value: 0.2118
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 76114189,
      end: 87661513,
      numProbes: 5917,
      value: -0.7085
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 76093556,
      end: 76110365,
      numProbes: 11,
      value: -4.452
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 63340985,
      end: 76087289,
      numProbes: 7374,
      value: -0.7075
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 57180528,
      end: 63338349,
      numProbes: 3905,
      value: 0.221
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 57173329,
      end: 57176908,
      numProbes: 2,
      value: -1.5932
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 49978424,
      end: 57172232,
      numProbes: 4063,
      value: 0.2334
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 49749805,
      end: 49976448,
      numProbes: 131,
      value: -0.6765
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 37396693,
      end: 49747633,
      numProbes: 3962,
      value: 0.2231
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 37389985,
      end: 37395076,
      numProbes: 4,
      value: -1.0445
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 34712820,
      end: 37387915,
      numProbes: 1333,
      value: 0.2388
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 8656669,
      end: 34708689,
      numProbes: 16776,
      value: -0.7094
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 8619322,
      end: 8655386,
      numProbes: 34,
      value: -5.106
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 4241132,
      end: 8616474,
      numProbes: 1505,
      value: -0.7265
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 4240940,
      end: 4241054,
      numProbes: 2,
      value: -7.2199
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 1208805,
      end: 4240925,
      numProbes: 1669,
      value: -0.7119
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "8",
      start: 617667,
      end: 930451,
      numProbes: 155,
      value: -4.2219
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "7",
      start: 115181622,
      end: 158385118,
      numProbes: 23022,
      value: 0.2151
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "7",
      start: 115181271,
      end: 115181357,
      numProbes: 2,
      value: 1.8737
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "7",
      start: 93685391,
      end: 115180647,
      numProbes: 10740,
      value: 0.2153
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "7",
      start: 93683616,
      end: 93684144,
      numProbes: 4,
      value: -1.3536
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "7",
      start: 82612005,
      end: 93682407,
      numProbes: 5410,
      value: 0.2154
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "7",
      start: 82609304,
      end: 82610262,
      numProbes: 5,
      value: -0.9891
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "7",
      start: 71490008,
      end: 82605569,
      numProbes: 4822,
      value: 0.2289
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "7",
      start: 71480843,
      end: 71489776,
      numProbes: 10,
      value: -0.4829
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "7",
      start: 29835020,
      end: 71480281,
      numProbes: 21102,
      value: 0.2221
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "7",
      start: 29792232,
      end: 29822279,
      numProbes: 29,
      value: -0.6814
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "7",
      start: 705284,
      end: 29791748,
      numProbes: 15947,
      value: 0.2151
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 168277738,
      end: 170903919,
      numProbes: 811,
      value: 0.2377
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 161789173,
      end: 168270238,
      numProbes: 3499,
      value: -0.7158
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 161763312,
      end: 161786694,
      numProbes: 18,
      value: -3.6736
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 156201599,
      end: 161753326,
      numProbes: 3413,
      value: -0.72
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 156201012,
      end: 156201248,
      numProbes: 3,
      value: -4.9443
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 153967777,
      end: 156200568,
      numProbes: 1493,
      value: -0.6612
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 139725588,
      end: 153946241,
      numProbes: 8868,
      value: 0.2435
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 139718926,
      end: 139724949,
      numProbes: 4,
      value: -0.7218
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 135349570,
      end: 139716941,
      numProbes: 2876,
      value: 0.231
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 135342254,
      end: 135343238,
      numProbes: 2,
      value: -1.7472
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 117019472,
      end: 135335429,
      numProbes: 10765,
      value: 0.2381
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 106038310,
      end: 117016762,
      numProbes: 6564,
      value: -0.7212
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 66357489,
      end: 106037860,
      numProbes: 22010,
      value: 0.234
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 66356639,
      end: 66356757,
      numProbes: 2,
      value: -1.9615
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 55349650,
      end: 66353061,
      numProbes: 2976,
      value: 0.2197
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 55341607,
      end: 55345403,
      numProbes: 3,
      value: -2.863
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 38076164,
      end: 55336331,
      numProbes: 10779,
      value: 0.2185
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 37057606,
      end: 38074244,
      numProbes: 614,
      value: 0.7732
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 2164325,
      end: 37053844,
      numProbes: 20502,
      value: 0.2122
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 2162749,
      end: 2163474,
      numProbes: 2,
      value: -2.1869
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "6",
      start: 1014281,
      end: 2161192,
      numProbes: 872,
      value: 0.2199
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 177746360,
      end: 180360469,
      numProbes: 1377,
      value: 0.2244
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 176957597,
      end: 177744217,
      numProbes: 174,
      value: -0.7476
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 168532467,
      end: 176946576,
      numProbes: 5107,
      value: 0.2087
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 168522112,
      end: 168532137,
      numProbes: 11,
      value: -1.0801
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 140916357,
      end: 168518373,
      numProbes: 17972,
      value: 0.2138
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 140803629,
      end: 140911422,
      numProbes: 52,
      value: -0.6697
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 123546684,
      end: 140784427,
      numProbes: 9646,
      value: 0.2086
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 123537576,
      end: 123546260,
      numProbes: 9,
      value: -0.7347
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 123480625,
      end: 123536491,
      numProbes: 31,
      value: 0.3134
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 113321898,
      end: 123474316,
      numProbes: 5809,
      value: -0.7264
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 113320355,
      end: 113320778,
      numProbes: 2,
      value: -3.9754
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 109983605,
      end: 113320137,
      numProbes: 2288,
      value: -0.7211
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 109982583,
      end: 109982795,
      numProbes: 2,
      value: -3.6512
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 89882068,
      end: 109978803,
      numProbes: 9757,
      value: -0.7181
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 89865854,
      end: 89881778,
      numProbes: 7,
      value: -2.1454
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 75726963,
      end: 89864738,
      numProbes: 7630,
      value: -0.7198
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 75259085,
      end: 75724985,
      numProbes: 359,
      value: 0.1964
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 75258446,
      end: 75259043,
      numProbes: 5,
      value: -6.6277
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 70819971,
      end: 75255293,
      numProbes: 2778,
      value: 0.2073
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 66644503,
      end: 70817911,
      numProbes: 1384,
      value: -0.7246
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "5",
      start: 914233,
      end: 66639638,
      numProbes: 35621,
      value: 0.2268
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 177796613,
      end: 188763651,
      numProbes: 5184,
      value: -0.7165
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 171692801,
      end: 177791404,
      numProbes: 3316,
      value: 0.2238
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 171689684,
      end: 171689818,
      numProbes: 2,
      value: -3.2116
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 171075161,
      end: 171687319,
      numProbes: 343,
      value: 0.2451
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 171068077,
      end: 171070516,
      numProbes: 2,
      value: -1.9924
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 152680701,
      end: 171065247,
      numProbes: 10401,
      value: 0.2159
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 150955949,
      end: 152677580,
      numProbes: 791,
      value: 0.7709
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 150915157,
      end: 150954229,
      numProbes: 31,
      value: -0.6813
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 138523136,
      end: 150901114,
      numProbes: 7155,
      value: 0.7804
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 138013614,
      end: 138515322,
      numProbes: 262,
      value: 0.2723
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 137994244,
      end: 138011032,
      numProbes: 12,
      value: -0.2958
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 127258991,
      end: 137993837,
      numProbes: 4946,
      value: 0.2528
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 78005837,
      end: 127258721,
      numProbes: 27787,
      value: -0.7014
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 18422330,
      end: 78004668,
      numProbes: 31356,
      value: 0.2361
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "3",
      start: 46484261,
      end: 52013563,
      numProbes: 2209,
      value: 0.195
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "3",
      start: 52028350,
      end: 53776712,
      numProbes: 878,
      value: -0.7862
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "3",
      start: 53776995,
      end: 197538677,
      numProbes: 76728,
      value: 0.2114
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 1053934,
      end: 18414885,
      numProbes: 10668,
      value: 0.2069
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "4",
      start: 18421158,
      end: 18421798,
      numProbes: 3,
      value: -1.958
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "3",
      start: 46477219,
      end: 46480958,
      numProbes: 3,
      value: -1.9527
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "3",
      start: 42244622,
      end: 46476348,
      numProbes: 2492,
      value: 0.1919
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "3",
      start: 27914273,
      end: 42243851,
      numProbes: 8822,
      value: 0.7657
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "3",
      start: 2212571,
      end: 27909805,
      numProbes: 14920,
      value: 0.2055
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 78400250,
      end: 242476062,
      numProbes: 85532,
      value: 0.2061
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 78396267,
      end: 78399695,
      numProbes: 2,
      value: -2.6689
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 71288879,
      end: 78395652,
      numProbes: 3910,
      value: 0.1916
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 71286167,
      end: 71288787,
      numProbes: 2,
      value: -1.9297
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 70442792,
      end: 71285874,
      numProbes: 560,
      value: 0.1881
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 70423558,
      end: 70439760,
      numProbes: 11,
      value: 0.8579
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 70389900,
      end: 70421985,
      numProbes: 16,
      value: 0.1159
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 70371571,
      end: 70381785,
      numProbes: 10,
      value: -0.8133
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 6658248,
      end: 70369023,
      numProbes: 37312,
      value: 0.1953
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 6656742,
      end: 6657578,
      numProbes: 3,
      value: -2.2234
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 6297054,
      end: 6655781,
      numProbes: 325,
      value: 0.1758
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 6295641,
      end: 6295756,
      numProbes: 2,
      value: -2.114
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 5959381,
      end: 6295524,
      numProbes: 291,
      value: 0.1735
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 5958743,
      end: 5958997,
      numProbes: 3,
      value: -1.5976
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 5166890,
      end: 5958708,
      numProbes: 606,
      value: 0.1848
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 4999999,
      end: 5004039,
      numProbes: 5,
      value: -0.9434
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "2",
      start: 484222,
      end: 4997283,
      numProbes: 2291,
      value: 0.1925
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 235768784,
      end: 247813706,
      numProbes: 7608,
      value: 0.2275
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 234930171,
      end: 235763211,
      numProbes: 390,
      value: 0.7595
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 234912288,
      end: 234915914,
      numProbes: 3,
      value: -0.5717
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 221590000,
      end: 234908287,
      numProbes: 8429,
      value: 0.759
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 221587450,
      end: 221588015,
      numProbes: 2,
      value: -0.7688
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 217115312,
      end: 221585278,
      numProbes: 2949,
      value: 0.7757
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 207746653,
      end: 217111943,
      numProbes: 6584,
      value: 0.2213
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 207712848,
      end: 207734866,
      numProbes: 4,
      value: -0.9269
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 204157168,
      end: 207697830,
      numProbes: 2102,
      value: 0.202
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 200191383,
      end: 204156841,
      numProbes: 2509,
      value: 0.7576
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 200189305,
      end: 200189524,
      numProbes: 3,
      value: -0.7011
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 153994647,
      end: 200188593,
      numProbes: 28707,
      value: 0.7692
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 153985743,
      end: 153992734,
      numProbes: 7,
      value: -0.6409
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 149898951,
      end: 153979279,
      numProbes: 1873,
      value: 0.7645
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 116556470,
      end: 149890533,
      numProbes: 2393,
      value: 0.2191
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 116552570,
      end: 116556138,
      numProbes: 3,
      value: -1.1621
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 112579141,
      end: 116552183,
      numProbes: 2531,
      value: 0.217
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 112567672,
      end: 112575032,
      numProbes: 17,
      value: -0.8569
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 104802221,
      end: 112565239,
      numProbes: 4441,
      value: 0.2234
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 104798629,
      end: 104798853,
      numProbes: 3,
      value: -0.9208
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 101295332,
      end: 104795504,
      numProbes: 1736,
      value: 0.2556
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 101269419,
      end: 101292652,
      numProbes: 10,
      value: -0.5996
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 100824593,
      end: 101266091,
      numProbes: 284,
      value: 0.1934
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 100822030,
      end: 100823047,
      numProbes: 3,
      value: -1.8243
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 84538704,
      end: 100817279,
      numProbes: 10060,
      value: 0.2264
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 79835336,
      end: 84537360,
      numProbes: 2936,
      value: -0.6973
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 79834021,
      end: 79835191,
      numProbes: 4,
      value: -2.8748
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 65818617,
      end: 79828164,
      numProbes: 8076,
      value: -0.6817
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 65801352,
      end: 65818481,
      numProbes: 9,
      value: -2.6031
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 55043569,
      end: 65800657,
      numProbes: 7771,
      value: -0.7076
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 55039805,
      end: 55043533,
      numProbes: 7,
      value: -3.5606
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 38738690,
      end: 55038988,
      numProbes: 8499,
      value: -0.687
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 38735871,
      end: 38737593,
      numProbes: 3,
      value: -4.1975
    },
    {
      sample: "TCGA-24-2024-01",
      chr: "1",
      start: 3218610,
      end: 38735280,
      numProbes: 18343,
      value: -0.6915
    }
  ],
  [
    {
      gene: {
        chromosome: "string",
        cytoband: "string",
        entrezGeneId: "number",
        hugoGeneSymbol: "string",
        length: "number",
        type: "string"
      },
      startPos: "number",
      endPos: "number",
      referenceAllele: "string",
      variantAllele: "string",
      aminoAcidChange: "string",
      center: "string",
      mutationStatus: "string",
      validationStatus: "string",
      geneticProfileId: "string",
      sampleId: "string",
      tumorRefCount: "number",
      tumorAltCount: "number",
      normalRefCount: "number",
      normalAltCount: "number",
      proteinChange: "string",
      mutationType: "string",
      proteinPosEnd: "number",
      proteinPosStart: "number",
      keyword: "string",
      uniprotEntryName: "string",
      uniprotAccession: "string",
      functionalImpactScore: "string",
      fisValue: "number",
      linkPdb: "string",
      linkMsa: "string",
      linkXvar: "string"
    },
    {
      gene: {
        chromosome: "21",
        cytoband: null,
        entrezGeneId: 4685,
        hugoGeneSymbol: "NCAM2",
        length: null,
        type: null
      },
      startPos: 22841054,
      endPos: 22841054,
      referenceAllele: "C",
      variantAllele: "A",
      aminoAcidChange: null,
      center: null,
      mutationStatus: "Somatic",
      validationStatus: "Valid",
      geneticProfileId: "ov_tcga_pub_mutations",
      sampleId: "TCGA-24-2024-01",
      tumorRefCount: null,
      tumorAltCount: null,
      normalRefCount: null,
      normalAltCount: null,
      proteinChange: "Q616K",
      mutationType: "Missense_Mutation",
      proteinPosEnd: 616,
      proteinPosStart: 616,
      keyword: "NCAM2 Q616 missense",
      uniprotEntryName: null,
      uniprotAccession: null,
      functionalImpactScore: "L",
      fisValue: null,
      linkPdb: "getma.org/pdb.php?prot=NCAM2_HUMAN&from=593&to=678&var=Q616K",
      linkMsa:
        "http://mutationassessor.org/r2/?cm=msa&ty=f&p=NCAM2_HUMAN&rb=593&re=678&var=Q616K",
      linkXvar:
        "http://mutationassessor.org/r2/?cm=var&var=hg19,21,22841054,C,A&fts=all"
    },
    {
      gene: {
        chromosome: "6",
        cytoband: null,
        entrezGeneId: 23195,
        hugoGeneSymbol: "MDN1",
        length: null,
        type: null
      },
      startPos: 90368337,
      endPos: 90368337,
      referenceAllele: "G",
      variantAllele: "A",
      aminoAcidChange: null,
      center: null,
      mutationStatus: "Somatic",
      validationStatus: "Valid",
      geneticProfileId: "ov_tcga_pub_mutations",
      sampleId: "TCGA-24-2024-01",
      tumorRefCount: null,
      tumorAltCount: null,
      normalRefCount: null,
      normalAltCount: null,
      proteinChange: "Q5005*",
      mutationType: "Nonsense_Mutation",
      proteinPosEnd: 5005,
      proteinPosStart: 5005,
      keyword: "MDN1 truncating",
      uniprotEntryName: null,
      uniprotAccession: null,
      functionalImpactScore: "L",
      fisValue: null,
      linkPdb: null,
      linkMsa: null,
      linkXvar:
        "http://mutationassessor.org/r2/?cm=var&var=hg19,6,90368337,G,A&fts=all"
    },
    {
      gene: {
        chromosome: "5",
        cytoband: null,
        entrezGeneId: 324,
        hugoGeneSymbol: "APC",
        length: null,
        type: null
      },
      startPos: 112175577,
      endPos: 112175577,
      referenceAllele: "A",
      variantAllele: "G",
      aminoAcidChange: null,
      center: null,
      mutationStatus: "Somatic",
      validationStatus: "Valid",
      geneticProfileId: "ov_tcga_pub_mutations",
      sampleId: "TCGA-24-2024-01 (deliberately elongated id)",
      tumorRefCount: null,
      tumorAltCount: null,
      normalRefCount: null,
      normalAltCount: null,
      proteinChange: "Q1429R",
      mutationType: "Missense_Mutation",
      proteinPosEnd: 1429,
      proteinPosStart: 1429,
      keyword: "APC Q1429 missense",
      uniprotEntryName: null,
      uniprotAccession: null,
      functionalImpactScore: "M",
      fisValue: null,
      linkPdb: null,
      linkMsa:
        "http://mutationassessor.org/r2/?cm=msa&ty=f&p=APC_HUMAN&rb=1395&re=1484&var=Q1429R",
      linkXvar:
        "http://mutationassessor.org/r2/?cm=var&var=hg19,5,112175577,A,G&fts=all"
    }
  ]
];

export default data;
