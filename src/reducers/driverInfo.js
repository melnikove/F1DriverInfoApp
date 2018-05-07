export default function driverInfo(state=[], action)
{
	if (action.type==='UPDATE_DRIVER_INFO')
	{
		return [
					action.payload
		        ];
	}

	return state;
}