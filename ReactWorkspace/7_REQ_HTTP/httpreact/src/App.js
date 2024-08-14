import './App.css';

import {useState, useEffect} from "react";

const url = "http://localhost:3000/products"

function App() {
  //locais pra salvar os dados
  const [products, setProducts] = useState([])
  const [name, setName] = useState([]);
  const [price, setPrice] = useState([]);
  
  //1 - resgatando dados
  //chamada asyncrona 
  useEffect(() =>{
    
    async function fetchData(){
    
    const res = await fetch(url)

    //transformando em json object
    const data = await res.json()

    setProducts(data)
  }
  
  fetchData();
  }, []);


  // 2 add produtos
  const handleSubmit = async (e) => {
    e.preventDefault() //para nao submeter formulario

    const product = {
      name,  //quando o vamor tem o mesmo nome da chave não precisamos colocar name: name 
      price, 
    };
    const res  = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type:" : "application/json",
      },
      body: JSON.stringify(product),
    });


  };


  return (
    <div className="App">
        <h1>Lista de Produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - R$: {product.price}</li>
        ))}
      </ul>

        <div className='add-product'>
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input type="text" value={name} name='name' onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Preço:
              <input type="text" value={price} name='price' onChange={(e) => setPrice(e.target.value)} />
            </label>
            <input type="submit" value="Criar" />
          </form>
        </div>

    </div>
  );
}

export default App;
