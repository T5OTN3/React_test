

export default function Card({ personName, index}){

    return(
        <div key={index} className='rounded-lg bg-white m-2'>
            <img src={`https://robohash.org/${index}`} className="App-logo" alt="logo" />
            <p className='text-sm'>{personName}</p>
        </div>
    );
}