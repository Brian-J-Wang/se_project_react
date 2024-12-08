function EditProfileModal(props) {
    
    return (
        <>
            <h2>Change profile data</h2>
            <label htmlFor="name">Name *</label>
            <input type="text" name="name" id="name"/>
            <label htmlFor="avatar">Avatar *</label>
            <input type="text" name="avatar" id="avatar"/>
        </>
    )
}