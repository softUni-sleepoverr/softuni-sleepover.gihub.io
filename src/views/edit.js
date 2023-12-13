import { html } from "../lib/lit-html.js";
import { submitHandler } from "../util.js";
import * as roomService from '../data/room.js'

const editTemplate = (room, onSubmit) => html`
    <h2>Edit ROOm</h2>
    <form @submit=${onSubmit}>
        <label>Name: <input type='text' name='name' .value=${room.name}></label>
        <label>Location: <input type='text' name='location' .value=${room.location}></label>
        <label>Beds: <input type='number' name='beds' .value=${room.beds}></label>
        <label>Open for booking: <input type='checkbox' name='openForBooking' .checked=${room.openForBooking}></label>
        <button>Save Changes</button>
    </form>`;

export function editView(ctx) {
    const id = ctx.params.id;
    ctx.render(editTemplate(ctx.data, submitHandler(onSubmit)));

async function onSubmit({name, location, beds, openForBooking}) {
    beds = parseInt(beds);
    openForBooking = Boolean(openForBooking);

    if(name === '' || location === '' || Number.isNaN(beds)){
        return alert('all fields are required');
        }
        const userId = ctx.user.objectId;

        await roomService.update(id, {name, location, beds, openForBooking}, userId )

        ctx.page.redirect('/rooms/'+id)
    }
   
}