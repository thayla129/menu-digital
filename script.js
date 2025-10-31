// Navigation functionality
const menuToggle = document.getElementById("menuToggle")
const navLinks = document.getElementById("navLinks")
const navMenu = document.getElementById("navMenu")
const backToTop = document.getElementById("backToTop")

// Toggle mobile menu
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active")

  // Animate hamburger icon
  const spans = menuToggle.querySelectorAll("span")
  if (navLinks.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translateY(10px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translateY(-10px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active")
    const spans = menuToggle.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

// Active navigation link on scroll
const sections = document.querySelectorAll("section[id]")
const navLinksArray = document.querySelectorAll(".nav-link")

function updateActiveLink() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinksArray.forEach((link) => {
        link.classList.remove("active")
        // CORREÇÃO 1: Adicionado o acento grave (`) para template literal
        if (link.getAttribute("href") === `#${sectionId}`) { 
          link.classList.add("active")
        }
      })
    }
  })
}


// Scroll effects
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  // Add scrolled class to nav
  if (currentScroll > 100) {
    navMenu.classList.add("scrolled")
  } else {
    navMenu.classList.remove("scrolled")
  }

  // Show/hide back to top button
  if (currentScroll > 500) {
    backToTop.classList.add("visible")
  } else {
    backToTop.classList.remove("visible")
  }

  // Update active navigation link
  updateActiveLink()

  lastScroll = currentScroll
})

// Back to top functionality
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all menu items
document.querySelectorAll(".menu-item, .drink-item").forEach((item) => {
  item.style.opacity = "0"
  item.style.transform = "translateY(30px)"
  item.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
  observer.observe(item)
})

// Add hover effect sound (optional - can be enabled with actual sound files)
const menuItems = document.querySelectorAll(".menu-item")

menuItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    // Add subtle scale effect
    item.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")

  if (heroContent && scrolled < window.innerHeight) {
    // CORREÇÃO 2: Adicionado o acento grave (`) para template literal
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
    heroContent.style.opacity = 1 - scrolled / 500
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in"
    document.body.style.opacity = "1"
  }, 100)
})

// Price update functionality (for admin use)
function updatePrice(itemName, newPrice) {
  const items = document.querySelectorAll(".menu-item, .drink-item")
  items.forEach((item) => {
    const name = item.querySelector(".item-name, .drink-name")
    if (name && name.textContent === itemName) {
      const priceElement = item.querySelector(".item-price")
      if (priceElement) {
        // CORREÇÃO 3: Adicionado o acento grave (`) para template literal
        priceElement.textContent = `R$ ${newPrice}`
      }
    }
  })
}

// Console message for developers
console.log("%c🍷 Adega do Chefe - Cardápio Digital", "color: #d4af37; font-size: 20px; font-weight: bold;")
console.log("%cDesenvolvido com ❤️ para proporcionar a melhor experiência", "color: #f5f5dc; font-size: 12px;")

// Instagram link functionality
function openInstagram() {
  const username = 'adega_dochefe01'
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  if (isMobile) {
    // Try to open Instagram app first
    const instagramApp = `instagram://user?username=${username}`
    const instagramWeb = `https://www.instagram.com/${username}/`
    
    // Create a hidden iframe to attempt opening the app
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = instagramApp
    document.body.appendChild(iframe)
    
    // Fallback to web version after a short delay
    setTimeout(() => {
      document.body.removeChild(iframe)
      window.open(instagramWeb, '_blank')
    }, 1000)
  } else {
    // Desktop - open web version
    window.open(`https://www.instagram.com/${username}/`, '_blank')
  }
}

// WhatsApp link functionality
function openWhatsApp() {
  const phoneNumber = '5511959340479'
  const message = 'Olá! Vi o cardápio da Adega do Chefe e gostaria de fazer um pedido.'
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  if (isMobile) {
    // Try to open WhatsApp app first
    const whatsappApp = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
    const whatsappWeb = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    
    // Create a hidden iframe to attempt opening the app
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = whatsappApp
    document.body.appendChild(iframe)
    
    // Fallback to web version after a short delay
    setTimeout(() => {
      document.body.removeChild(iframe)
      window.open(whatsappWeb, '_blank')
    }, 1000)
  } else {
    // Desktop - open WhatsApp Web
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }
}

// Add interactive wine item effects
document.addEventListener('DOMContentLoaded', () => {
  const wineItems = document.querySelectorAll('.wine-item')
  
  wineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      // Add subtle animation on hover
      item.style.transform = 'translateY(-5px) scale(1.02)'
    })
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0) scale(1)'
    })
    
    // Add click effect for mobile
    item.addEventListener('click', () => {
      item.style.transform = 'scale(0.98)'
      setTimeout(() => {
        item.style.transform = 'translateY(0) scale(1)'
      }, 150)
    })
  })
})

// Caipirinha dropdown functionality
function toggleCaipirinhaPrices() {
  const dropdown = document.getElementById('caipirinhaPricesDropdown')
  const toggle = document.querySelector('.card-dropdown-toggle')
  
  if (dropdown && toggle) {
    const isOpen = dropdown.classList.contains('open')
    
    if (isOpen) {
      dropdown.classList.remove('open')
      toggle.classList.remove('active')
    } else {
      dropdown.classList.add('open')
      toggle.classList.add('active')
    }
  }
}

// Gin Eternity dropdown functionality
function toggleGinEternityFlavors() {
  const dropdown = document.getElementById('ginEternityFlavorsDropdown')
  const toggle = document.querySelector('.gin-eternity-card .card-dropdown-toggle')
  
  if (dropdown && toggle) {
    const isOpen = dropdown.classList.contains('open')
    
    if (isOpen) {
      dropdown.classList.remove('open')
      toggle.classList.remove('active')
    } else {
      dropdown.classList.add('open')
      toggle.classList.add('active')
    }
  }
}

// Gin Full dropdown functionality
function toggleGinFullFlavors() {
  const dropdown = document.getElementById('ginFullFlavorsDropdown')
  const toggle = document.querySelector('.gin-full-card .card-dropdown-toggle')
  
  if (dropdown && toggle) {
    const isOpen = dropdown.classList.contains('open')
    
    if (isOpen) {
      dropdown.classList.remove('open')
      toggle.classList.remove('active')
    } else {
      dropdown.classList.add('open')
      toggle.classList.add('active')
    }
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  // Caipirinha dropdown
  const caipirinhaDrop = document.getElementById('caipirinhaPricesDropdown')
  const caipirinhaToggle = document.querySelector('.caipirinha-card .card-dropdown-toggle')
  const caipirinhaCard = document.querySelector('.caipirinha-card')
  
  if (caipirinhaDrop && caipirinhaToggle && caipirinhaCard) {
    if (!caipirinhaCard.contains(event.target)) {
      caipirinhaDrop.classList.remove('open')
      caipirinhaToggle.classList.remove('active')
    }
  }
  
  // Gin Eternity dropdown
  const eternityDrop = document.getElementById('ginEternityFlavorsDropdown')
  const eternityToggle = document.querySelector('.gin-eternity-card .card-dropdown-toggle')
  const eternityCard = document.querySelector('.gin-eternity-card')
  
  if (eternityDrop && eternityToggle && eternityCard) {
    if (!eternityCard.contains(event.target)) {
      eternityDrop.classList.remove('open')
      eternityToggle.classList.remove('active')
    }
  }
  
  // Gin Full dropdown
  const fullDrop = document.getElementById('ginFullFlavorsDropdown')
  const fullToggle = document.querySelector('.gin-full-card .card-dropdown-toggle')
  const fullCard = document.querySelector('.gin-full-card')
  
  if (fullDrop && fullToggle && fullCard) {
    if (!fullCard.contains(event.target)) {
      fullDrop.classList.remove('open')
      fullToggle.classList.remove('active')
    }
  }
})

// Initialize
updateActiveLink()