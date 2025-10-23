/**
 * Sample JavaScript file for Jalangi2 analysis
 * This demonstrates the endorsement feature functionality
 */

// Simulate endorsement tracking
var endorsements = {};

function canUserEndorse(uid) {
    // Check if user is staff (admin or moderator)
    var staffUsers = [1, 2, 3]; // Example staff user IDs
    return staffUsers.indexOf(uid) !== -1;
}

function endorsePost(pid, uid) {
    if (!canUserEndorse(uid)) {
        console.log('Error: User ' + uid + ' cannot endorse posts');
        return false;
    }
    
    if (!endorsements[pid]) {
        endorsements[pid] = [];
    }
    
    if (endorsements[pid].indexOf(uid) === -1) {
        endorsements[pid].push(uid);
        console.log('Post ' + pid + ' endorsed by user ' + uid);
        return true;
    }
    
    console.log('Post ' + pid + ' already endorsed by user ' + uid);
    return false;
}

function unendorsePost(pid, uid) {
    if (!canUserEndorse(uid)) {
        console.log('Error: User ' + uid + ' cannot unendorse posts');
        return false;
    }
    
    if (endorsements[pid]) {
        var index = endorsements[pid].indexOf(uid);
        if (index !== -1) {
            endorsements[pid].splice(index, 1);
            console.log('Post ' + pid + ' unendorsed by user ' + uid);
            return true;
        }
    }
    
    console.log('Post ' + pid + ' was not endorsed by user ' + uid);
    return false;
}

function getEndorsementCount(pid) {
    return endorsements[pid] ? endorsements[pid].length : 0;
}

function isPostEndorsed(pid) {
    return getEndorsementCount(pid) > 0;
}

// Test the endorsement functionality
console.log('=== Testing Endorsement Feature ===');

// Test 1: Staff user endorses a post
endorsePost(101, 1); // Staff user 1 endorses post 101
endorsePost(101, 2); // Staff user 2 endorses post 101

// Test 2: Non-staff user tries to endorse
endorsePost(101, 999); // Non-staff user tries to endorse

// Test 3: Check endorsement status
console.log('Post 101 endorsed:', isPostEndorsed(101));
console.log('Post 101 endorsement count:', getEndorsementCount(101));

// Test 4: Unendorse a post
unendorsePost(101, 1); // Staff user 1 unendorses
console.log('Post 101 endorsement count after unendorse:', getEndorsementCount(101));

// Test 5: Try to endorse same post twice
endorsePost(102, 1);
endorsePost(102, 1); // Duplicate endorsement attempt

console.log('=== End of Tests ===');

