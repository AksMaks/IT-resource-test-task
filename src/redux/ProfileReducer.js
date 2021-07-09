let initialState = {
};

const ProfileReducer = (state = initialState, action) => {
    let stateCopy = {...state};
    
	switch (action.type) {
        case "":{
            return stateCopy;
        }
		default:{
			return state;
		}
	}
}

export const ActionCreator = {
    setData: (data) => {
        return {
            type: "",
            data: data
        }
    }
}

export default ProfileReducer;