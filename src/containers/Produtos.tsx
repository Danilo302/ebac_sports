import { useSelector } from 'react-redux'
import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import { useGetProdutosQuery } from '../services/api'
import { RootReducer } from '../store'

import * as S from './styles'

const ProdutosComponent = () => {
  const { data: produtos, isLoading } = useGetProdutosQuery()

  const itensFavorito = useSelector(
    (state: RootReducer) => state.favoritos.itens
  )
  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    const produtoId = produto.id
    const IdsDosFavoritos = itensFavorito.map((f) => f.id)

    return IdsDosFavoritos.includes(produtoId)
  }

  if (isLoading) return <h2>Carregando...</h2>

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
            // favoritar={favoritar}
            // aoComprar={adicionarAoCarrinho}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
