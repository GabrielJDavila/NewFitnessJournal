
// Toggles delete set or delete exercise modal
export function toggleDelete(e, setCurrentItemToDelete, setToggleDeleteExModal, setToggleDeleteSetModal) {
    const exId = e.target.dataset.deleteexid
    const setId = e.target.dataset.deletesetid
    const exOfSetId = e.target.id

    setCurrentItemToDelete(prev => ({
        ...prev,
        exIdToDelete: exOfSetId ? exOfSetId : exId,
        setIdToDelete: setId
    }))

    if(e.target.dataset.deleteexid || e.target.dataset.closedeleteexmodal) {
        setToggleDeleteExModal(prev => !prev)
    } else if(e.target.dataset.deletesetid || e.target.dataset.closedeletesetmodal) {
        setToggleDeleteSetModal(prev => !prev)
    } else {
        setToggleDeleteExModal(false)
        setToggleDeleteSetModal(false)
    }

}

// Toggles the edit set modal.
export function toggleEdit(e, setNewSetInfo, setToggleEditSetModal) {
    if(e) {
        const exId = e.target.id
        const setId = e.target.dataset.editsetid

        setNewSetInfo(prev => ({
            ...prev,
            exId: exId,
            setId: setId
        }))
    }
    setToggleEditSetModal(prev => !prev)
}

// saving original toggle functions from dashboard here for now.
// function toggleDelete(e, setCurrentItemToDelete, setToggleDeleteExModal, setToggleDeleteSetModal) {
    //     const exId = e.target.dataset.deleteexid
    //     const setId = e.target.dataset.deletesetid
    //     const exOfSetId = e.target.id

    //     setCurrentItemToDelete(prev => ({
    //         ...prev,
    //         exIdToDelete: exOfSetId ? exOfSetId : exId,
    //         setIdToDelete: setId
    //     }))

    //     if(e.target.dataset.deleteexid || e.target.dataset.closedeleteexmodal) {
    //         setToggleDeleteExModal(prev => !prev)
    //     } else if(e.target.dataset.deletesetid || e.target.dataset.closedeletesetmodal) {
    //         setToggleDeleteSetModal(prev => !prev)
    //     } else {
    //         setToggleDeleteExModal(false)
    //         setToggleDeleteSetModal(false)
    //     }

    // }

    // function toggleEdit(e) {
    //     if(e) {
    //         const exId = e.target.id
    //         const setId = e.target.dataset.editsetid

    //         setNewSetInfo(prev => ({
    //             ...prev,
    //             exId: exId,
    //             setId: setId
    //         }))
    //     }
    //     setToggleEditSetModal(prev => !prev) 
    // }