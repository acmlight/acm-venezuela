const findAttribute = (attributes, productAttr) => {
   return productAttr ? attributes.find(item => item.id === productAttr) : null
}

export default findAttribute