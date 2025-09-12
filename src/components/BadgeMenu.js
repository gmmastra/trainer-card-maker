// menu for adding badges

export function BadgeMenu(props) {

    // handles adding/removing each checkbox element
    const handleCheck = (e) => {
        if (document.getElementById(e.target.id).checked && props.badgeList.length < 8) {
            const newList = [...props.badgeList, e.target.value];
            props.setBadgeList(newList);
        } else if (props.badgeList.length < 9) {
            var tmp = [...props.badgeList]; // make a separate copy of the array
            var index = tmp.indexOf(e.target.value)
            if (index !== -1) {
                tmp.splice(index, 1);
                props.setBadgeList(tmp);
            }
        }
    };

    return (
        <div className='input-menu' style={{ marginBottom: '50px' }}>
            <h3>BADGES</h3>
            <details>
                <summary>FireRed/LeafGreen</summary>
                <label><input type="checkbox" id="1" value="fireredleafgreen-1" onClick={e => handleCheck(e)} /><span>Boulder Badge</span></label>
                <label><input type="checkbox" id="2" value="fireredleafgreen-2" onClick={e => handleCheck(e)} /><span>Cascade Badge</span></label>
                <label><input type="checkbox" id="3" value="fireredleafgreen-3" onClick={e => handleCheck(e)} /><span>Thunder Badge</span></label>
                <label><input type="checkbox" id="4" value="fireredleafgreen-4" onClick={e => handleCheck(e)} /><span>Rainbow Badge</span></label>
                <label><input type="checkbox" id="5" value="fireredleafgreen-5" onClick={e => handleCheck(e)} /><span>Soul Badge</span></label>
                <label><input type="checkbox" id="6" value="fireredleafgreen-6" onClick={e => handleCheck(e)} /><span>Marsh Badge</span></label>
                <label><input type="checkbox" id="7" value="fireredleafgreen-7" onClick={e => handleCheck(e)} /><span>Volcano Badge</span></label>
                <label><input type="checkbox" id="8" value="fireredleafgreen-8" onClick={e => handleCheck(e)} /><span>Earth Badge</span></label>
            </details>
            <details>
                <summary>Ruby/Sapphire</summary>
                <label><input type="checkbox" id="9" value="rubysapphire-1" onClick={e => handleCheck(e)} /><span>Stone Badge</span></label>
                <label><input type="checkbox" id="10" value="rubysapphire-2" onClick={e => handleCheck(e)} /><span>Knuckle Badge</span></label>
                <label><input type="checkbox" id="11" value="rubysapphire-3" onClick={e => handleCheck(e)} /><span>Dunamo Badge</span></label>
                <label><input type="checkbox" id="12" value="rubysapphire-4" onClick={e => handleCheck(e)} /><span>Heat Badge</span></label>
                <label><input type="checkbox" id="13" value="rubysapphire-5" onClick={e => handleCheck(e)} /><span>Balance Badge</span></label>
                <label><input type="checkbox" id="14" value="rubysapphire-6" onClick={e => handleCheck(e)} /><span>Feather Badge</span></label>
                <label><input type="checkbox" id="15" value="rubysapphire-7" onClick={e => handleCheck(e)} /><span>Mind Badge</span></label>
                <label><input type="checkbox" id="16" value="rubysapphire-8" onClick={e => handleCheck(e)} /><span>Rain Badge</span></label>
            </details>
            <details>
                <summary>Diamond/Pearl</summary>
                <label><input type="checkbox" id="17" value="diamondpearl-1" onClick={e => handleCheck(e)} /><span>Coal Badge</span></label>
                <label><input type="checkbox" id="18" value="diamondpearl-2" onClick={e => handleCheck(e)} /><span>Forest Badge</span></label>
                <label><input type="checkbox" id="19" value="diamondpearl-3" onClick={e => handleCheck(e)} /><span>Cobble Badge</span></label>
                <label><input type="checkbox" id="20" value="diamondpearl-4" onClick={e => handleCheck(e)} /><span>Fen Badge</span></label>
                <label><input type="checkbox" id="21" value="diamondpearl-5" onClick={e => handleCheck(e)} /><span>Relic Badge</span></label>
                <label><input type="checkbox" id="22" value="diamondpearl-6" onClick={e => handleCheck(e)} /><span>Mine Badge</span></label>
                <label><input type="checkbox" id="23" value="diamondpearl-7" onClick={e => handleCheck(e)} /><span>Icicle Badge</span></label>
                <label><input type="checkbox" id="24" value="diamondpearl-8" onClick={e => handleCheck(e)} /><span>Beacon Badge</span></label>
            </details>
        </div>
    );
}