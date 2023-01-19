export default {
    authors: [
        {
            id: "123",
            name: 'John',
        }
    ],
    folders: [
        {
            id: "2",
            name: 'Timeline',
            createdAt: "2023",
            authorId: 123,
        },
        {
            id: "1",
            name: 'Working',
            createdAt: "2022",
            authorId: 123,
        }
    ],
    notes: [
        {
            id: '12',
            content: '<p>This is content of note 12</p>',
            folderId: '1'
        },
        {
            id: '15',
            content: '<p>This is content of note 15</p>',
            folderId: '1'
        },
        {
            id: '14',
            content: '<p>This is content of note 14</p>',
            folderId: '2'
        },
    ]
}