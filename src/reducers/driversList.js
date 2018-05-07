export default function driversList(state=[], action)
{
	if (action.type==='UPDATE_DRIVERS_LIST')
	{
		return action.payload;
	}

	return state;
}