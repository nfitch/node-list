/**
 * Tests for the Indexed Linked List.
 */
var IndexedLinkedList = require("../lib/indexed-linked-list").IndexedLinkedList;

test('Test shift and unshift', function () {
    var ill = new IndexedLinkedList();

    //Shift on one
    expect(ill.shift(5, 5)).toBeTruthy();
    verify(ill, [5]);

    //Shift on many more
    for(i = 4; i > 0; --i) {
        expect(ill.shift(i, i)).toBeTruthy();
    }
    verify(ill, [1, 2, 3, 4, 5]);

    //Shift them all off
    for(i = 1; i <= 5; ++i) {
        expect(ill.unshift()).toBe(i);
    }
    verify(ill, []);
    expect(ill.unshift()).toBeNull();
});

test('Test push and pop', function () {
    var ill = new IndexedLinkedList();

    //Push on one
    expect(ill.push(1, 1)).toBeTruthy();
    verify(ill, [1]);

    //Push on many more
    for(i = 2; i <= 5; ++i) {
        expect(ill.push(i, i)).toBeTruthy();
    }
    verify(ill, [1, 2, 3, 4, 5]);

    //Pop them all off
    for(i = 5; i > 0; --i) {
        expect(ill.pop()).toBe(i);
    }
    verify(ill, []);
    expect(ill.pop()).toBeNull();
});

test('Test get', function () {
    var ill = getFive();
    for(i = 1; i <= 5; ++i) {
        expect(ill.get(i)).toBe(i);
    }
});

test('Test exists', function () {
    var ill = getFive();

    for(i = 1; i <= 5; ++i) {
        expect(ill.exists(i)).toBeTruthy();
    }
    expect(ill.exists(6)).toBeFalsy();
    expect(ill.exists(-1)).toBeFalsy();
    expect(ill.exists("foo")).toBeFalsy();
});

test('Test remove', function () {
    var ill = getFive();

    //Remove from middle
    expect(ill.remove(3)).toBe(3);
    verify(ill, [1, 2, 4, 5]);

    //Remove head
    expect(ill.remove(1)).toBe(1);
    verify(ill, [2, 4, 5]);

    //Remove tail
    expect(ill.remove(5)).toBe(5);
    verify(ill, [2, 4]);

    //Remove the rest
    expect(ill.remove(2)).toBe(2);
    expect(ill.remove(4)).toBe(4);
    expect(ill.getSize()).toBe(0);
    expect(ill.getHead()).toBeNull();
    expect(ill.getTail()).toBeNull();
});

test('Test moveAfter', function () {
    var ill = getFive();

    //Move from front to end
    expect(ill.moveAfter(1, 5)).toBeTruthy();
    verify(ill, [2, 3, 4, 5, 1]);

    //Move from front to middle
    expect(ill.moveAfter(2, 4)).toBeTruthy();
    verify(ill, [3, 4, 2, 5, 1]);

    //Move from middle to middle
    expect(ill.moveAfter(4, 5)).toBeTruthy();
    verify(ill, [3, 2, 5, 4, 1]);

    //Move from end to middle
    expect(ill.moveAfter(1, 3)).toBeTruthy();
    verify(ill, [3, 1, 2, 5, 4]);

    //Move from middle to end
    expect(ill.moveAfter(2, 4)).toBeTruthy();
    verify(ill, [3, 1, 5, 4, 2]);

    //Swap 2 elements in the middle
    expect(ill.moveAfter(5, 4)).toBeTruthy();
    verify(ill, [3, 1, 4, 5, 2]);

    //Swap 2 elements at the end
    expect(ill.moveAfter(5, 2)).toBeTruthy();
    verify(ill, [3, 1, 4, 2, 5]);

    //Swap 2 elements at the beginning
    expect(ill.moveAfter(3, 1)).toBeTruthy();
    verify(ill, [1, 3, 4, 2, 5]);

    //Back to order
    expect(ill.moveAfter(2, 1)).toBeTruthy();
    verify(ill, [1, 2, 3, 4, 5]);

    //Move the "same" element
    expect(ill.moveAfter(3, 3)).toBeTruthy();
    expect(ill.moveAfter(1, 1)).toBeTruthy();
    expect(ill.moveAfter(5, 5)).toBeTruthy();

    //Elements in order already
    expect(ill.moveAfter(4, 3)).toBeTruthy();
    verify(ill, [1, 2, 3, 4, 5]);
});

test('Test moveBefore', function () {
    var ill = getFive();

    //Move from end to front
    expect(ill.moveBefore(5, 1)).toBeTruthy();
    verify(ill, [5, 1, 2, 3, 4]);

    //Move from end to middle
    expect(ill.moveBefore(4, 2)).toBeTruthy();
    verify(ill, [5, 1, 4, 2, 3]);

    //Move from middle to middle
    expect(ill.moveBefore(2, 1)).toBeTruthy();
    verify(ill, [5, 2, 1, 4, 3]);

    //Move from front to middle
    expect(ill.moveBefore(5, 3)).toBeTruthy();
    verify(ill, [2, 1, 4, 5, 3]);

    //Move from middle to front
    expect(ill.moveBefore(4, 2)).toBeTruthy();
    verify(ill, [4, 2, 1, 5, 3]);

    //Swap 2 elements in the middle
    expect(ill.moveBefore(1, 2)).toBeTruthy();
    verify(ill, [4, 1, 2, 5, 3]);

    //Swap 2 elements at the end
    expect(ill.moveBefore(3, 5)).toBeTruthy();
    verify(ill, [4, 1, 2, 3, 5]);

    //Swap 2 elements at the beginning
    expect(ill.moveBefore(1, 4)).toBeTruthy();
    verify(ill, [1, 4, 2, 3, 5]);

    //Back to order
    expect(ill.moveBefore(4, 5)).toBeTruthy();
    verify(ill, [1, 2, 3, 4, 5]);

    //Move the "same" element
    expect(ill.moveBefore(3, 3)).toBeTruthy();
    expect(ill.moveBefore(1, 1)).toBeTruthy();
    expect(ill.moveBefore(5, 5)).toBeTruthy();

    //Elements in order already
    expect(ill.moveBefore(3, 4)).toBeTruthy();
    verify(ill, [1, 2, 3, 4, 5]);
});

test('Test insert after', function () {
    var ill = getFive();

    //Already exists
    expect(ill.insertAfter(5, 5, 5)).toBeFalsy();

    //After/Before key doesn't exist
    expect(ill.insertAfter(0, 0, 6)).toBeFalsy();

    //Insert after head
    expect(ill.insertAfter(1.5, 1.5, 1)).toBeTruthy();
    verify(ill, [1, 1.5, 2, 3, 4, 5]);

    //Insert after in middle
    expect(ill.insertAfter(3.5, 3.5, 3)).toBeTruthy();
    verify(ill, [1, 1.5, 2, 3, 3.5, 4, 5]);

    //Insert after tail
    expect(ill.insertAfter(5.5, 5.5, 5)).toBeTruthy();
    verify(ill, [1, 1.5, 2, 3, 3.5, 4, 5, 5.5]);
});

test('Test insert before', function () {
    var ill = getFive();

    //Already exists
    expect(ill.insertBefore(5, 5, 5)).toBeFalsy();

    //After/Before key doesn't exist
    expect(ill.insertBefore(0, 0, 6)).toBeFalsy();

    //Insert before head
    expect(ill.insertBefore(0.5, 0.5, 1)).toBeTruthy();
    verify(ill, [0.5, 1, 2, 3, 4, 5]);

    //Insert before in middle
    expect(ill.insertBefore(2.5, 2.5, 3)).toBeTruthy();
    verify(ill, [0.5, 1, 2, 2.5, 3, 4, 5]);

    //Insert before tail
    expect(ill.insertBefore(4.5, 4.5, 5)).toBeTruthy();
    verify(ill, [0.5, 1, 2, 2.5, 3, 4, 4.5, 5]);
});

function verify(ill, expected) {
    expect(ill instanceof IndexedLinkedList).toBe(true);
    if (ill.getHead() != null) {
        expect(ill.getHead().getPrevious()).toBeNull();
        expect(ill.getHead().getValue()).toBe(expected[0]);
    }
    else {
        expect(ill.getSize()).toBe(0);
        expect(ill.empty()).toBeTruthy();
    }

    if(ill.getTail() != null) {
        expect(ill.getTail().getNext()).toBeNull();
        expect(ill.getTail().getValue()).toBe(expected[expected.length - 1]);
    }
    else {
        expect(ill.getSize()).toBe(0);
        expect(ill.empty()).toBeTruthy();
    }

    //Walk the linked list and verify all the pointers are pointing at the
    // right places.
    var n = ill.getHead();
    var i = 0;
    while (n != null) {
        expect(n.getValue()).toBe(expected[i]);
        if (n.getPrevious() != null) {
            expect(n.getPrevious().getNext()).toBe(n);
        }
        if (n.getNext() != null) {
            expect(n.getNext().getPrevious()).toBe(n);
        }
        ++i;
        n = n.getNext();
    }
    expect(i).toBe(ill.getSize());
}

//Returns [1, 2, 3, 4, 5]
function getFive() {
    var ill = new IndexedLinkedList();
    for(i = 5; i > 0; --i) {
        expect(ill.shift(i, i)).toBeTruthy();
    }
    return ill;
}
