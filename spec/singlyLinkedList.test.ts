import { SinglyLinkedList, Item } from '../singlyLinkedList'
import * as chai from 'chai'
import { expect } from 'chai'
// import chaiChange from 'chai-change'
// chai.use(chaiChange)

describe('SinglyLinkedList', () => {
	let list: SinglyLinkedList
	beforeEach(() => {
		list = new SinglyLinkedList()
	})
	context('new', () => {
		it('does not have head and tail', () => {
			expect(list.head).to.eq(null)
			expect(list.tail).to.eq(null)
		})
	})

	context('push', () => {
		context('when length is zero', () => {
			it('set item as head and tail', () => {
				// expect(() => {
				// 	list.push('initial')
				// }).to.alter(() => list.length, { by: 1 })
				list.push('initial')
				expect(list.head.val).to.eq('initial')
				expect(list.tail.val).to.eq('initial')
				expect(list.length).to.eq(1)	
			})
		})

		context('when length is not zero', () => {
			it('set item as tail', () => {
				list.push('initial')
				list.push('second')
				expect(list.head.val).to.eq('initial')
				expect(list.head.next.val).to.eq('second')
				expect(list.tail.val).to.eq('second')
				expect(list.tail.next).to.eq(null)
			})
		})
	})

	context('shift', () => {
		context('when length is zero', () => {
			xit('return undefned', () => {
				expect(list.length).to.eq(0)
			})
		})

		context('when length is not zero', () => {
			xit('return head', () => {
				expect(list.length).to.eq(0)
			})
		})
	})

	context('get', () => {
		context('when index is smaller than zero or larger than length-1', () => {
			xit('set item as head and tail', () => {
				expect(list.length).to.eq(0)
			})
		})

		context('when', () => {
			xit('set item as head', () => {
				expect(list.length).to.eq(0)
			})
		})
	})

	context('set', () => {
		context('when node is not found', () => {
			xit('set item as head and tail', () => {
				expect(list.length).to.eq(0)
			})
		})

		context('when node is found', () => {
			xit('set item as head', () => {
				expect(list.length).to.eq(0)
			})
		})
	})

	context('insert')
	context('remove')
	context('revert')
})