import { FiPlus } from "react-icons/fi"
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles"
import { useState, useEffect } from "react"
import { Note } from "../../components/Note"
import { Input } from "../../components/Input"
import { Header } from "../../components/Header"
import { Section } from "../../components/Section"
import { ButtonText } from "../../components/ButtonText"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"

export function Home() {
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()

  function handleTagSelected(tagName) {
    if (tagName === "all") {
      return setTagsSelected([])
    }

    const alreadySelected = tagsSelected.includes(tagName)

    if (alreadySelected) {
      const filteredTags = tagsSelected.filter((tag) => tag !== tagName)
      setTagsSelected(filteredTags)
    } else {
      setTagsSelected((prevState) => [...prevState, tagName])
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`)
  }

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await api.get("/tags")
        console.log("Tags response:", response.data) // Adicione este log
        // Verifique a estrutura da resposta e atualize o estado corretamente
        if (response.data && Array.isArray(response.data)) {
          setTags(response.data)
          console.log("Tags state:", response.data) // Adicione este log para verificar o estado
        } else {
          console.error("Tags not found in response:", response.data)
        }
      } catch (error) {
        console.error("Error fetching tags:", error)
      }
    }

    fetchTags()
  }, [])

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${tagsSelected}`
      )
      setNotes(response.data)
    }

    fetchNotes()
  }, [tagsSelected, search])

  return (
    <Container>
      <Brand>
        <h1>EasyNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title="Todos"
            onClick={() => handleTagSelected("all")}
            isActive={tagsSelected.length === 0}
          />
        </li>
        {tags &&
          tags.map((tag) => (
            <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                onClick={() => handleTagSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))}
      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {notes.map((note) => (
            <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
            />
          ))}
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  )
}