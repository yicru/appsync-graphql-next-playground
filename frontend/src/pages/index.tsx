import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { API } from '@aws-amplify/api'
import { Note } from '../../interfaces/note'

const query = `
  query listNotes {
    listNotes {
      id name completed
    }
  }
`

const fetchNotes = async () => {
  return API.graphql({ query })
}

export const Home: NextPage = () => {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    fetchNotes().then((results) => {
      // TODO: amplify APIの型付け
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      setNotes(results.data.listNotes ?? [])
    })
  }, [])

  return (
    <div className="min-h-screen flex justify-center items-center">
      <ul>
        {notes.map((note, index) => (
          <li key={`note-${index}`}>{note.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home
