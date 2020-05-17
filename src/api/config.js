import axios from 'axios'
export function get(url, params){    
  return new Promise((resolve, reject) =>{        
      axios.get(url, {            
          params: params        
      }).then(res => {
          console.log(res.data)
          resolve(res.data);
      }).catch(err =>{
          alert(2)
          reject(err.data)        
  })    
});}
export function post(url, params) {
  return new Promise((resolve, reject) => {
       axios.post(url, params)
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}