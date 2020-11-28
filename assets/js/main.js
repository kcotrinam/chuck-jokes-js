/* FUNCTION TO GET THE JOKE */
async function getJoke(category) {
  const url = `https://api.chucknorris.io/jokes/random?category=${category}`
  const answer = await fetch(url)
  const json = await answer.json()

  if (answer.status !== 200) {
    throw Error('Category not supported')
  }
  return json.value
}

const displayJoke = async cat => {
  const jokeContainer = document.querySelector('.joke-container')

  try {
    const joke = await getJoke(`${cat}`)
    jokeContainer.innerHTML = `${joke}`
    storeJoke(joke)
  } catch (e) {
    jokeContainer.innerHTML = `Error: ${e}`
  }
}

(function getCategory()  {
  const categoryList = document.querySelectorAll('.category-item')
  categoryList.forEach(item => {
    item.addEventListener('click', () => {
      displayJoke(item.innerText)
    })
  })
})()

const storeJoke = (joke) => {
  const saveButton = document.querySelector('#save')
  saveButton.addEventListener('click', () => {
    db.collection('starjokes').add ({
      joke: joke
    });
  })
}
