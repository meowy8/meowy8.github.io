const profileIconBtn = document.getElementById('profile-icon-btn')
const signInDropdown = document.getElementById('sign-in-dropdown')
const favouritesBtn = document.getElementById('favourites-btn')
const favouritesDropdown = document.getElementById('favourites-dropdown')
const favouritesItems = document.getElementById('favourites-items')
const basketBtn = document.getElementById('basket-btn')
const basketDropdown = document.getElementById('basket-dropdown')
const basketItems = document.getElementById('basket-items')
const basketTotal = document.querySelector('.basket-total span')
const productsDisplay = document.getElementById('products-display')
const profileIcon = document.getElementById('profile-icon')
const favIcon = document.getElementById('fav-icon')
const basketIcon = document.getElementById('basket-icon')
const mainDisplay = document.getElementById('main-display')
const titleBtn = document.getElementById('title-btn')

titleBtn.addEventListener('click', function() {
  productsDisplay.style.display = 'none'
  mainDisplay.style.display = 'flex'
})

const menSectionDropdownBtns = document.querySelectorAll('.men-section-dropdown button')
const mainDisplayMenBtn = document.getElementById('main-display-men-btn')
mainDisplayMenBtn.addEventListener('click', function() {
  getMenClothingData('Bestsellers')
})
menSectionDropdownBtns.forEach(button => {
  button.addEventListener('click', function() {
    const displayChoice = button.innerText
    getMenClothingData(displayChoice)
  })
})

const womenSectionDropdownBtns = document.querySelectorAll('.women-section-dropdown button');
const mainDisplayWomenBtn = document.getElementById('main-display-women-btn')
mainDisplayWomenBtn.addEventListener('click', function() {
  getWomenClothingData('Bestsellers')
})
womenSectionDropdownBtns.forEach(button => {
  button.addEventListener('click', function() {
    const displayChoice = button.innerText;
    getWomenClothingData(displayChoice);
  });
});

const accessoriesSectionDropdownBtns = document.querySelectorAll('.accessories-section-dropdown button');
accessoriesSectionDropdownBtns.forEach(button => {
  button.addEventListener('click', function() {
    const displayChoice = button.innerText;
    getAccessoriesData(displayChoice);
  });
});

const createProductDisplay = (itemData) => {
  const productDisplayHtml = `
  <div class="product-container">
    <div class="product-img">
      <img src="${itemData.src}" alt="" id="product-img">
      <button class="add-to-fav-btn">
        <span class="material-symbols-outlined favourites-icon">
          favorite
        </span>
      </button>
    </div>
    <div class="product-footer">
      <div class="product-footer-top">
        <p class="product-name">${itemData.name}</p>
        <p class="product-price">£${itemData.price}</p>
      </div>
      <div class="product-footer-bottom">
        <div>
          <label for="quantity-value">Quantity:</label>
          <input type="number" name="quantity-value" id="quantity-value" value=1 min="0">
        </div>
        <button id="add-to-cart-btn" class="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  </div>
  `
  return productDisplayHtml
}

profileIconBtn.addEventListener('click', function() {
  const currentView = window.getComputedStyle(signInDropdown).display
  
  signInDropdown.style.display = currentView === 'none' ? 'flex' : 'none'
})
favouritesBtn.addEventListener('click', function() {
  const currentView = window.getComputedStyle(favouritesDropdown).display
  
  favouritesDropdown.style.display = currentView === 'none' ? 'flex' : 'none'
})
basketBtn.addEventListener('click', function() {
  const currentView = window.getComputedStyle(basketDropdown).display
  
  basketDropdown.style.display = currentView === 'none' ? 'flex' : 'none'
})

const favouritesRemoveBtn = () => {
  const favouritesItem = favouritesItems.querySelectorAll('.favourites-item')
  favouritesItem.forEach(item => {
    const removeItemBtn = item.querySelector('button')
    removeItemBtn.addEventListener('click', function() {
      item.remove()
    })
  })
}

const addToFavFunc = (productImgSrc, displayNameText, productPriceNum) => {
  const listOfNameElements = favouritesItems.querySelectorAll('.fav-display-name-text')

  const duplicateItem = Array.from(listOfNameElements).some(element => element.innerText === displayNameText)

  if (!duplicateItem) {
    favouritesItems.innerHTML += `
    <div class="favourites-item">
      <div class="favourites-item-img-container">
        <img src="${productImgSrc}" alt="">
      </div>
      <div class="favourites-item-info">
        <p class="fav-display-name-text">${displayNameText}</p>
        <p>Price: £<span>${productPriceNum}</span></p>
      </div>
      <div class="close-btn-container">
        <button>
          <span class="material-symbols-outlined">
            close
          </span>
        </button>
      </div>
    </div>
    `

    favouritesRemoveBtn()
  }
}

const basketRemoveBtn = () => {
  const basketItem = basketItems.querySelectorAll('.basket-item')
  basketItem.forEach(item => {
    const removeItemBtn = item.querySelector('button')
    const productTotalNum = item.querySelector('.product-total')
    removeItemBtn.addEventListener('click', function() {
      basketTotal.innerText = (Number(basketTotal.innerText) - Number(productTotalNum.innerText)).toFixed(2)
      item.remove()
    })
  })
}

const basketTotalFunc = () => {
  const productTotal = document.querySelectorAll('.product-total')
  
  let basketTotalValue = 0
  productTotal.forEach(total => {
    basketTotalValue += Number(total.innerText)
  })

  basketTotal.innerText = Number(basketTotalValue.toFixed(2))
}

const addToCartFunc = (productImgSrc, displayNameText, productPriceNum, quantityValue) => {
  const productQuantityNum = Number(quantityValue.value)
  const listOfNameElements = basketItems.querySelectorAll('.basket-display-name-text')

  if (productQuantityNum < 1) {
    alert('You must add at least one item.')
    quantityValue.value = 1
    return
  }

  let basketItemInfo = null
  const duplicateItem = Array.from(listOfNameElements).some(element => {
    if (element.innerText === displayNameText) {
      basketItemInfo = element.parentElement
      return true
    } else {
      return false
    }
  })

  if (duplicateItem) {
    const duplicateItemQuantity = basketItemInfo.querySelector('.product-quantity-value')
    const duplicateItemPrice = basketItemInfo.querySelector('.product-total')

    duplicateItemQuantity.innerText = Number(duplicateItemQuantity.innerText) + productQuantityNum 
    duplicateItemPrice.innerText = (Number(duplicateItemPrice.innerText) + (productPriceNum * productQuantityNum)).toFixed(2)
  } else {
    basketItems.innerHTML += `
    <div class="basket-item" id="basket-item">
        <div class="basket-item-img-container">
          <img src="${productImgSrc}" alt="">
        </div>
        <div class="basket-item-info" id="basket-item-info">
          <p class="basket-display-name-text">${displayNameText}</p>
          <p>Quantity: <span class="product-quantity-value">${productQuantityNum}</span></p>
          <p>Price: £<span class="product-total">${(productPriceNum * productQuantityNum).toFixed(2)}</span></p>
        </div>
        <div class="close-btn-container">
          <button>
            <span class="material-symbols-outlined">
              close
            </span>
          </button>
        </div>
      </div>
    `

    basketRemoveBtn()
  }

  basketTotalFunc()
}

const gatherContainerInfo = (container) => {
  const addToCartBtn = container.querySelector('.add-to-cart-btn')
  const addToFavBtn = container.querySelector('.add-to-fav-btn')
  const productImg = container.querySelector('img')
  const displayName = container.querySelector('.product-name')
  const productPrice = container.querySelector('.product-price')
  const quantityValue = container.querySelector('input')

  const productImgSrc = productImg.src
  const displayNameText = displayName.innerText
  const productPriceNum = Number(productPrice.innerText.replace('£', ''))

  addToCartBtn.addEventListener('click', function() {
    addToCartFunc(productImgSrc, displayNameText, productPriceNum, quantityValue)
  })

  addToFavBtn.addEventListener('click', function() {
    addToFavFunc(productImgSrc, displayNameText, productPriceNum)
  })
}

const getMenClothingData = (displayChoice) => {
  fetch('itemsData/mensClothing.json')
  .then(response => response.json())
  .then(data => {
    mainDisplay.style.display = 'none'
    productsDisplay.style.display = 'flex'
    if (displayChoice === 'Bestsellers') {
      productsDisplay.innerHTML = `
      <section class="men-bestsellers" id="men-bestsellers"></section>
      `
      const menBestsellers = document.getElementById('men-bestsellers')
  
      const menBestsellersData = data.bestsellers
  
      for (const item in menBestsellersData) {
        const itemData = menBestsellersData[item]
        menBestsellers.innerHTML += createProductDisplay(itemData)
      }
  
      menBestsellers.style.display = 'grid'
  
      const productContainer = menBestsellers.querySelectorAll('.product-container')
      productContainer.forEach(container => {
        gatherContainerInfo(container)
      }) 
    } else if (displayChoice === 'T-Shirts/Shirts') {
      productsDisplay.innerHTML = `
      <section class="men-shirts" id="men-shirts"></section>
      `
      const menShirts = document.getElementById('men-shirts')
  
      const menShirtsData = data['t-shirts']
  
      for (const item in menShirtsData) {
        const itemData = menShirtsData[item]
        menShirts.innerHTML += createProductDisplay(itemData)
      }
  
      menShirts.style.display = 'grid'
  
      const productContainer = menShirts.querySelectorAll('.product-container')
      productContainer.forEach(container => {
        gatherContainerInfo(container)
      }) 
    } else if (displayChoice === 'Trousers') {
      productsDisplay.innerHTML = `
      <section class="men-trousers" id="men-trousers"></section>
      `
      const menTrousers = document.getElementById('men-trousers')
  
      const menTrousersData = data['trousers']
  
      for (const item in menTrousersData) {
        const itemData = menTrousersData[item]
        menTrousers.innerHTML += createProductDisplay(itemData)
      }
  
      menTrousers.style.display = 'grid'
  
      const productContainer = menTrousers.querySelectorAll('.product-container')
      productContainer.forEach(container => {
        gatherContainerInfo(container)
      }) 
    } else if (displayChoice === 'Sweatshirts/Hoodies') {
      productsDisplay.innerHTML = `
      <section class="men-hoodies" id="men-hoodies"></section>
      `
      const menHoodies = document.getElementById('men-hoodies')
  
      const menHoodiesData = data['sweatshirts/hoodies']
  
      for (const item in menHoodiesData) {
        const itemData = menHoodiesData[item]
        menHoodies.innerHTML += createProductDisplay(itemData)
      }
  
      menHoodies.style.display = 'grid'
  
      const productContainer = menHoodies.querySelectorAll('.product-container')
      productContainer.forEach(container => {
        gatherContainerInfo(container)
      }) 
    }
  })
}

const getWomenClothingData = (displayChoice) => {
  fetch('itemsData/womensClothing.json')
    .then(response => response.json())
    .then(data => {
      mainDisplay.style.display = 'none'
      productsDisplay.style.display = 'flex'
      if (displayChoice === 'Bestsellers') {
        productsDisplay.innerHTML = `
          <section class="women-bestsellers" id="women-bestsellers"></section>
        `;
        const womenBestsellers = document.getElementById('women-bestsellers');
    
        const womenBestsellersData = data.bestsellers;
    
        for (const item in womenBestsellersData) {
          const itemData = womenBestsellersData[item];
          womenBestsellers.innerHTML += createProductDisplay(itemData);
        }
    
        womenBestsellers.style.display = 'grid';
    
        const productContainer = womenBestsellers.querySelectorAll('.product-container');
        productContainer.forEach(container => {
          gatherContainerInfo(container);
        }); 
      } else if (displayChoice === 'T-Shirts/Shirts') {
        productsDisplay.innerHTML = `
          <section class="women-shirts" id="women-shirts"></section>
        `;
        const womenShirts = document.getElementById('women-shirts');
    
        const womenShirtsData = data['t-shirts'];
    
        for (const item in womenShirtsData) {
          const itemData = womenShirtsData[item];
          womenShirts.innerHTML += createProductDisplay(itemData);
        }
    
        womenShirts.style.display = 'grid';
    
        const productContainer = womenShirts.querySelectorAll('.product-container');
        productContainer.forEach(container => {
          gatherContainerInfo(container);
        }); 
      } else if (displayChoice === 'Trousers') {
        productsDisplay.innerHTML = `
          <section class="women-trousers" id="women-trousers"></section>
        `;
        const womenTrousers = document.getElementById('women-trousers');
    
        const womenTrousersData = data['trousers'];
    
        for (const item in womenTrousersData) {
          const itemData = womenTrousersData[item];
          womenTrousers.innerHTML += createProductDisplay(itemData);
        }
    
        womenTrousers.style.display = 'grid';
    
        const productContainer = womenTrousers.querySelectorAll('.product-container');
        productContainer.forEach(container => {
          gatherContainerInfo(container);
        }); 
      } else if (displayChoice === 'Sweatshirts/Hoodies') {
        productsDisplay.innerHTML = `
          <section class="women-hoodies" id="women-hoodies"></section>
        `;
        const womenHoodies = document.getElementById('women-hoodies');
    
        const womenHoodiesData = data['sweatshirts/hoodies'];
    
        for (const item in womenHoodiesData) {
          const itemData = womenHoodiesData[item];
          womenHoodies.innerHTML += createProductDisplay(itemData);
        }
    
        womenHoodies.style.display = 'grid';
    
        const productContainer = womenHoodies.querySelectorAll('.product-container');
        productContainer.forEach(container => {
          gatherContainerInfo(container);
        }); 
      }
    });
}

const getAccessoriesData = (displayChoice) => {
  fetch('itemsData/accessories.json')
    .then(response => response.json())
    .then(data => {
      mainDisplay.style.display = 'none'
      productsDisplay.style.display = 'flex'
      if (displayChoice === 'Bestsellers') {
        productsDisplay.innerHTML = `
          <section class="accessories-bestsellers" id="accessories-bestsellers"></section>
        `;
        const accessoriesBestsellers = document.getElementById('accessories-bestsellers');
    
        const accessoriesBestsellersData = data.bestsellers;
    
        for (const item in accessoriesBestsellersData) {
          const itemData = accessoriesBestsellersData[item];
          accessoriesBestsellers.innerHTML += createProductDisplay(itemData);
        }
    
        accessoriesBestsellers.style.display = 'grid';
    
        const productContainer = accessoriesBestsellers.querySelectorAll('.product-container');
        productContainer.forEach(container => {
          gatherContainerInfo(container);
        }); 
      } else if (displayChoice === 'Jewellery') {
        productsDisplay.innerHTML = `
          <section class="accessories-jewellery" id="accessories-jewellery"></section>
        `;
        const accessoriesJewellery = document.getElementById('accessories-jewellery');
    
        const accessoriesJewelleryData = data.jewellery;
    
        for (const item in accessoriesJewelleryData) {
          const itemData = accessoriesJewelleryData[item];
          accessoriesJewellery.innerHTML += createProductDisplay(itemData);
        }
    
        accessoriesJewellery.style.display = 'grid';
    
        const productContainer = accessoriesJewellery.querySelectorAll('.product-container');
        productContainer.forEach(container => {
          gatherContainerInfo(container);
        }); 
      } else if (displayChoice === 'Hats') {
        productsDisplay.innerHTML = `
          <section class="accessories-hats" id="accessories-hats"></section>
        `;
        const accessoriesHats = document.getElementById('accessories-hats');
    
        const accessoriesHatsData = data.hats;
    
        for (const item in accessoriesHatsData) {
          const itemData = accessoriesHatsData[item];
          accessoriesHats.innerHTML += createProductDisplay(itemData);
        }
    
        accessoriesHats.style.display = 'grid';
    
        const productContainer = accessoriesHats.querySelectorAll('.product-container');
        productContainer.forEach(container => {
          gatherContainerInfo(container);
        }); 
      } else if (displayChoice === 'Bags') {
        productsDisplay.innerHTML = `
          <section class="accessories-bags" id="accessories-bags"></section>
        `;
        const accessoriesBags = document.getElementById('accessories-bags');
    
        const accessoriesBagsData = data.bags;
    
        for (const item in accessoriesBagsData) {
          const itemData = accessoriesBagsData[item];
          accessoriesBags.innerHTML += createProductDisplay(itemData);
        }
    
        accessoriesBags.style.display = 'grid';
    
        const productContainer = accessoriesBags.querySelectorAll('.product-container');
        productContainer.forEach(container => {
          gatherContainerInfo(container);
        }); 
      }
    });
}

