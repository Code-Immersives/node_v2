// const cheerio = require('cheerio')
// const request = require('request')
// request('https://www.1stdibs.com/art/paintings/abstract-paintings/', function (error, response, body) {
//   // console.log('error:', error) // Print the error if one occurred
//   // console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
//   // console.log('body:', body) // Print the HTML
//   const $ = cheerio.load(body)
//   // console.log(Object.keys(paintings[1]))
//   const names = $('.artist-name').text().split(' ')
//   names.map(e => console.log(e))
// })

let sortArr = [ 5, 7, 9]
let pivotArr = [5, 7, 9, 1, 2, 3]

const search = (arr, t) => {
  let arrLength = arr.length
  for (let i = 0; i < arrLength; i++) {
    if (arr[i] === t) {
      return i
    }
  }
  return -1
  // return the index of the element if found in array
  // else return -1 if it does not exist
}

console.log(search(pivotArr, 0)) // => -1
console.log(search(pivotArr, 5)) // => 0
console.log(search(pivotArr, 2))// => 4
