import { db } from './config'

// Single Doc Read (reference collection, reference doc by id, get it)
const ref = db.collection('posts').doc('postId').get() // replace .get() with .onSnapshot() to get realtime stream of data

// Subcollection Read 
const ref = db.collection('posts').doc('postId').collection('tags')

// Bucket Read

const post = db.collection('posts').doc('postId')
const tags = db.collection('tags').doc('postId')

// Multi-document Read
// The firebase sdk does pipelining so if you make multiple requests at once,
// it combines them & runs them concurrently

const post = await db.collection('posts').doc('postId').get()

const tagIds = post.data().tags 

const tagReads = tagIds.map(tag => db.collection('tags').doc(tag).get())

const tags = await Promise.all(tagReads)

// Reads an array of IDs from a collection concurrently
const readIds = async (collection, ids) => {
    const reads = ids.map(id => collection.doc(id).get() )
    const result = await Promise.all(reads)
    return result.map(v => v.data())
}

// QUERIES 
// orderBy can also be used as a filter, if you order by a property that only
// exists on a subset of docs, it filters out all docs that don't contain that property
// paginate: startAfter(lastWeek) or including last week startAt(lastWeek)
// where() - takes 3 args: 1st arg is field, 2nd is operator, 3rd is value to comapre to 
// e.g: where('date', '==', today)
// there is no !== operator but you can simulate this using 2 different queries which use the range operators
// > and < so if not less than or more than that value 
// OR isn't supported either but you can create two queries & combine them client side
const query = db.collection('posts').orderBy('date', 'desc').limit(20) 

// array-contains checks if a certain value is contained in an array, it can only check 1 value at a time 
const query = db.collection('posts').where('name', 'array-contains', 'okay')

