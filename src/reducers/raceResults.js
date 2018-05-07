export default function raceResults(state=[], action)
{
	if (action.type==='UPDATE_RACE_RESULTS')
	{
		return	action.payload;
	}

	return state;
}