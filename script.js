async function getData(){
  let container = document.getElementById("Card");
  // let lista = document.getElementById("list");
  let research = document.querySelector('#research').value;

  if(research == ""){
    alert('Digite alguma palavra chave!')
  } else {
     // lista.innerHTML = '';
  container.innerHTML ='';

  //Usando Fetch e tratando seus dados


  try {
    let response = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${research}
    +&fields=items/volumeInfo(title,authors,publisher,publishedDate,imageLinks,previewLink)`);
    let data = await response.json();
    console.log(response)
    console.log(data);
    console.log(data.items[0].volumeInfo.imageLinks)


    if(data.items[0].volumeInfo.imageLinks == undefined){
    
      container.innerHTML = 'Nada foi encontrado!'
    }
    
    
    for(let i = 0; i < data.items.length; i++)
    { 
        

        let card =`<div>`;
        card += `<div class="grid-item">`;
        card += `<img src="${data.items[i].volumeInfo.imageLinks.thumbnail} " class="card-image">`;
        card += `<div class="card-content">`
        card += `<p> Título: ${data.items[i].volumeInfo.title} </p>`;
        card += `<p> Autor: ${data.items[i].volumeInfo.authors} </p>`;
        card += `<p> Editora: ${data.items[i].volumeInfo.publisher} </p>`;
        card += `<p>Data De Publicação: ${data.items[i].volumeInfo.publishedDate}</p>`;
        card += `<p>Mais informações:<a target = "_blank" href=" ${data.items[i].volumeInfo.previewLink}"> Clique aqui!</a> `;
        card += "</div></div></div>"
        container.innerHTML += card;
        // lista.innerHTML += listitem;
    }

    } catch (error) {
      
    }
    // fim do catch
    } // fim do else
  


} // fim da async function

// Adiciona um evento de teclado ao campo de pesquisa
document.querySelector('#research').addEventListener('keypress', function(event) {
  // Verifica se a tecla pressionada é a tecla "Enter"
  if (event.key === 'Enter') {
      // Chama a função getData() para iniciar a busca
      getData();
  }
});
