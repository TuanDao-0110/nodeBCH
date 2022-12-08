const adapt = (item) => {
    let book = {}
    const { bookID, name, author, type, pages } = item
    const numberBookId = Number(bookID)
    const numberPage = Number(pages)
    Object.assign(book, {
        'bookID': numberBookId,
        name, author, type,
        'pages': numberPage
    })
    return book
}

module.exports =  adapt 