'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export type SearchForm = {
  query: string
}

export function SearchPanel() {
  const [displaySearchPanel, setDisplaySearchPanel] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>()
  const router = useRouter()

  function onSubmit(form: SearchForm) {
    const params = new URLSearchParams(form)
    router.push(`/revuedepresse?${params.toString()}`)
  }

  return (
    <div className="mb-2">
      <div className="flex items-center justify-end ">
        <button
          className="text-lg"
          onClick={() => {
            setDisplaySearchPanel((_) => !_)
          }}
        >
          <i className="ri-search-line mr-1" />
          Rechercher
        </button>
      </div>
      {displaySearchPanel && (
        <div>
          <form
            className="flex items-center justify-center gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input {...register('query', { required: true })} />
            {errors.query && <span>This field is required</span>}
            <button type="submit">Lancer la recherche</button>
          </form>
        </div>
      )}
    </div>
  )
}
