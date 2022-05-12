import { useState } from "react";

import Modal from "./Modal";
import { requestSync } from "../hooks/Fetch";

const TextInput = ({ label, value, update, name, placeholder, full }) => {
    return (
        <div className={"flex items-center justify-between my-2 " + (full ? " w-full" : "")}>
            <label htmlFor={name} className={"text-lg" + (full ? " w-full" : "")}>{label}</label>
            <input type="text" placeholder={placeholder} value={value} onChange={update} name={name}
                className="border-2 border-neutral-500 px-2 py-1 rounded-sm w-2/3 md:w-4/5 outline-none
                    placeholder:text-stone-500 text-neutral-100 bg-stone-400 focus:border-green-400"/>
        </div>
    );
};

const NumberInput = ({ label, value, update, name, min, max }) => {
    return (
        <div className="flex items-center justify-between my-2">
            <label htmlFor={name} className="text-lg">{label}</label>
            <input type="number" value={value} onChange={update} name={name}
                min={min} max={max} className="border-2 border-neutral-500 px-2 py-1 rounded-sm w-2/3 md:w-4/5
                outline-none placeholder:text-stone-500 text-neutral-100 bg-stone-400 focus:border-green-400"/>
        </div>
    );
};

const SelectInput = ({ label, value, update, name, choices }) => {
    return (
        <div className="flex items-center justify-between my-2">
            <label htmlFor={name} className="text-lg">{label}</label>
            <select name={name} onChange={update} className="border-2 border-neutral-500 px-2 py-1 rounded-sm w-2/3
                md:w-4/5 outline-none placeholder:text-stone-500 text-neutral-100 bg-stone-400
                focus:border-green-400">{
                    choices.map(({ value, key }, i) => <option value={value} key={i}>{key}</option>)
            }</select>
        </div>
    );
};

const AddVideoDialog = ({ onClose }) => {
    const modes = [{ key: "Solo", value: 1 }, { key: "Duo", value: 2 }, { key: "Trio", value: 3 },
        { key: "Squad", value: 4 }];

    const [video, setVideo] = useState({ name: "", poster: "", url: "", kills: 0, placement: 100,
        player: "", mode: 1, squad: [] });

    const updateForm = (e) => {
        const { value, name } = e.target;

        if (name.startsWith("sidekick")) {
            let editedSquad = video.squad;
            editedSquad[Number(name.slice(8))] = value;
            setVideo({ ...video, squad: editedSquad })
        } else
            setVideo({ ...video, [name]: value });
    };

    const addSquad = (e) => {
        e.preventDefault();
        setVideo({ ...video, squad: [...video.squad, ""] });
    };

    const deleteSquadMember = (e) => {
        e.preventDefault();
        let editedSquad = video.squad;
        editedSquad.splice(Number(e.name), 1);
        setVideo({ ...video, squad: editedSquad });
    };

    const add = async (e) => {
        e.preventDefault();
        const result = await requestSync({ url: "/api/video", method: "POST", body: JSON.stringify({ ...video }) });
        alert(result.msg);
        if (result.sucess)
            onClose(true);
    };

    return (
        <Modal onClose={() => onClose(false)} center>
            <form className="w-4/5 md:w-3/5 bg-stone-700 rounded-lg p-4 text-neutral-200" onSubmit={add}>
                <h2 className="w-fit mx-auto text-2xl mb-10 mt-2">Add a Video</h2>
                <TextInput label="Video name" value={video.name} update={updateForm} name="name"
                    placeholder="Fornite play"/>
                <TextInput label="Poster url" value={video.poster} update={updateForm} name="poster"
                    placeholder="https://picsum.photos/200/300"/>
                <TextInput label="Video url" value={video.url} update={updateForm} name="url"
                    placeholder="https://rr1---sn-4avf-cbps.googlevideo.com/videoplayback"/>
                <TextInput label="Player name" value={video.player} update={updateForm} name="player"
                    placeholder="fornite-boss"/>
                <NumberInput label="Placement" value={video.placement} update={updateForm} name="placement"
                    min={1} max={100}/>
                <NumberInput label="Kills" value={video.kills} update={updateForm} name="kills"  min={0} max={99}/>
                <SelectInput label="Mode" value={video.mode} update={updateForm} name="mode" choices={modes}/>
                { video.squad.map((squadMember, i) => (<div className="flex justify-between items-center">
                        <TextInput key={i} label={"Squad Member " + (i + 1)} value={squadMember} update={updateForm}
                            name={"sidekick" + i} placeholder={"sidekick " + (i + 1)} full/>
                        <button onClick={deleteSquadMember} className="px-2 bg-red-500 hover:bg-red-600 rounded-sm
                            h-fit ml-2 py-1" name={i}>Delete</button>
                    </div>))
                }
                <footer className="flex justify-between mt-8">
                    <button onClick={addSquad} className="p-2 bg-green-400 hover:bg-green-500 rounded-md flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-neutral-200" fill="none"
                            viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="ml-1">Add Squad Member</span>
                    </button>
                    <div className="flex space-x-2">
                        <button onClick={() => onClose(false)} className="px-4 py-2 bg-red-500 hover:bg-red-600
                            rounded-md flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                className="h-6 w-6 fill-neutral-200">
                                <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0
                                    256 0C397.4 0 512 114.6 512 256zM99.5 144.8C77.15 176.1 64 214.5 64 256C64 362
                                    149.1 448 256 448C297.5 448 335.9 434.9 367.2 412.5L99.5 144.8zM448 256C448 149.1
                                    362 64 256 64C214.5 64 176.1 77.15 144.8 99.5L412.5 367.2C434.9 335.9 448 297.5 448
                                    256V256z"/>
                            </svg>
                            <span className="ml-2">Cancel</span>
                        </button>
                        <button className="px-4 py-2 bg-green-400 hover:bg-green-500 rounded-md flex" onClick={add}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-neutral-200" fill="none"
                                viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121
                                    8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2
                                    2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="ml-2">Add Video</span>
                        </button>
                    </div>
                </footer>
            </form>
        </Modal>
    );
};

export default AddVideoDialog;