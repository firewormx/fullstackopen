/* eslint-disable react/prop-types */
const Recommendations = ({result, user}) => {
  if (!user) {
    return null
}

if (result.loading) {
    return <div>loading...</div>
}

const books = result.data.allBooks
const favoriteGenre = user.favoriteGenre
const booksInclFavorite = books.filter(book => book.genres.includes(favoriteGenre))

    return (<>
<h1>Recommendations</h1>
<p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
<table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>
                    {booksInclFavorite.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td> 
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
    </>)
}

export default Recommendations 