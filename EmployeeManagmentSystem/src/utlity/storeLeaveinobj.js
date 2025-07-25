
function setStoreLeaveInObj(leaves) {
     let storedLeaves = {}
     
    for (let i = 0; i < leaves.length; i++) {
       
        if(storedLeaves[leaves[i].employeeId]){
             storedLeaves[leaves[i].employeeId].push(leaves[i])
        }else{
             storedLeaves[leaves[i].employeeId] = [leaves[i]]
        }
        
    }

    return storedLeaves
}

export default setStoreLeaveInObj