let deferredPrompt

if (!window.Promise) {
  window.Promise = Promise
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function() {
      console.log('Service Worker registered')
    })
    .catch(err => {
      console.log(err)
    })
}

window.addEventListener('beforeinstallprompt', event => {
  console.log('beforeinstallprompt fired')
  event.preventDefault()
  deferredPrompt = event
  return false
})

fetch('https://httpbin.org/ip')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))

fetch('https://httpbin.org/post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({message: 'Did this work?'})
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
