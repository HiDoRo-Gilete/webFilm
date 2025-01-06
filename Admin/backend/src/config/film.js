const allFilm = [
    {
        "title": "Thiếu nhi",
        "key": 'TN',
        "films": [{"name":"Connan movie 18","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://tse2.mm.bing.net/th?id=OIP.zT0QBHS-Q0dKha5D6GvIAQHaJG&pid=Api&P=0&h=180"},
            {"name":"Connan movie 20","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://tse1.mm.bing.net/th?id=OIP.Tx_XmNE5Fb3BbNOni0g-TAHaKd&pid=Api&P=0&h=180"},
            {"name":"Connan movie 22","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://tse3.mm.bing.net/th?id=OIP.Y9ZWY2yFTFTTNkMsZ_JFYwHaKG&pid=Api&P=0&h=180"},
            {"name":"Movie 2: Shin cậu bé bút chì","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.WxV-CY8zOz-tVrNcqX88kgHaKe?w=156&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {"name":"Connan movie 19","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.qYdhbhkoWgy0AuN5Ut7zlAHaJG?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {"name":"Connan movie 21","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.48Omm0Wfxyk9F_xHuARjEAHaK2?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {"name":"Kimetsu no yaiba movie","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.3ZekMeaShPAZzP-X5DhDVgHaLH?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
        ]
    },
    {
        "title": "Phim Việt Nam",
        "key": 'PVN',
        "films": [{"name":"Bố già","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.NuK7Yv0Yp_6foIEIDtdXwgHaLH?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {"name":"Nhà bà nữ","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.RIS7cs71XEVZB2Pj2Ydy7QHaLc?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {"name":"Mai","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.q9I1OSQLVMMSAC_--U4-owHaKf?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {"name":"Chị mười ba: 3 ngày sinh tử","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.3MHluECdvSaJILIaNfLChwAAAA?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {"name":"Siêu lầy gặp siêu lừa","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.BqBP4E9arCAynZD-u4LSHgHaNK?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {"name":"Lật mặt 5","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.RF_Shsm8gx7qFRf1PXtp7gHaKl?w=156&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {"name":"Lật mặt 6","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.iNfV86AAe1jevqT1ce6OhQHaLH?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
        ]
    },
    {
        "title": "Phim nước ngoài",
        "key": 'PNN',
        "films": [{"name":"Fast & Furious 10","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.BPyaJjqgSoSj-t2uVeHQMgHaLv?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {"name":"Fast & Furious 11","date_start":"20/1/2025","date_end":"27/2/2025",'img':"http://ts4.mm.bing.net/th?id=OIP.1sNYSshVDq8Dudaqq0dovgAAAA&pid=15.1"},
            {"name":"Spiderman 1","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.EUd4Cs-nti2Ja698lCnLlQHaLH?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {"name":"Ironman","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.3GByvYL1xTT391g_RRpVNAHaLH?w=204&h=306&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {"name":"Batman","date_start":"20/1/2025","date_end":"27/2/2025",'img':"https://th.bing.com/th/id/OIP.qDa2g54rqtd7rnacL72gwwHaKh?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
        ]
    },
];

module.exports = {allFilm}