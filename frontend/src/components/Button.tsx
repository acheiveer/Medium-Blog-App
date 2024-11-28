interface ButtonProps{
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}


export function Button({ label, onClick }: ButtonProps) {
    return (
        <button 
            onClick={onClick} 
            type="button" 
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"        >
            {label}
        </button>
    );
}
