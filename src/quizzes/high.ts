export default {
    name: 'high level',
    list: [
        {
            title: "mail",
            rule: "OKは一致し、NGには一致しない正規表現を書いて下さい。",
            ok: [
                "aaa@gmail.com",
                "bbb@gmail.com",
            ],
            ng: [
                "aaa@@gmail.com",
                "aaagmail.com",
            ]
        },
        {
            title: "mail2",
            rule: "OKは一致し、NGには一致しない正規表現を書いて下さい。",
            ok: [
                "aaa@gmail.com",
                "bbb@gmail.com",
            ],
            ng: [
                "aaa@@gmail.com",
                "aaagmail.com",
            ]
        },
        {
            title: "mail3",
            ok: [
                "aaa@gmail.com",
                "bbb@gmail.com",
            ],
            ng: [
                "aaa@@gmail.com",
                "aaagmail.com",
            ]
        }
    ]
}