document.addEventListener('DOMContentLoaded', event => {
    if (navigator.serviceWorker){
      navigator.serviceWorker.register('/sw.js').then(reg => {
        console.log("it worked")
      }).catch(err => {
        console.log('boo');
      });
    }
  })