// Words list
const categories = {
	character_count: ["1girl", "2girls", "3girls"],
	hair_color: ["pink hair", "red hair", "blue hair", "black hair", "blonde hair", "multicolored hair, pink hair, white hair", "white hair", "green hair", "multicolored hair", "((dark blue hair))", "(((two-tone hair))), black hair: 50, white hair: 50, blonde hair: 50", "((white hair))", "yellow hair", "((pink blue hair)), split color hair", "pale pink hair", "((silver blue hair))", "pastel rainbow hair", "(shimmer hair), iredescent silver hair, (hair (houseki no kuni))", "(shimmer hair), iredescent silver hair, glowing hair, hair (houseki no kuni)", "aqua hair", "blonde hair: 50, pink hair: 20, green hair: 10", "blue hair", "blue hair, (((hair trim is water))), (((((extra long hair))))), ((((wind blowing)))), (((transparent hair))), aqua hair, water drops, beautiful ocean wave", "iridescent hair", "light blue hair", "light brown hair", "pale blonde hair", ],
	hair_style: ["((low tied long hair))", "((noodle hair))", "((pixie cut)), very short hair, tomboy", "(side shaved head)", "(wavy ponytail), hair over shoulder, very long hair, very thick hair", "low ponytail", "(((permed hair)))", "((permed hair)), bun hair", "wind blowing, wind blowing hair", "((medium hair))", "((messy hair))", "((((wind blowing, wind blowing hair))))", "(beautiful detailed afro hair)", "beehive hairdo", "drill twin tails", "hair loop", "ahoge", "cornrows", "curly hair", "extra long hair", "french braid", "hair bun", "low ponytails", "one side up hair", "short hair", "side ponytail", "single braid", "twin braids", "twintails", "wavy hair"],
	bang_style: ["((nape hair))", "((extra short bangs))", "(((quiff)))", "blunt bangs", "braided bangs", "hair between eyes", "hair over eyes", "hair over eyes, no eyes", "hime cut bangs", "hime cut, straight short bangs", "open forehead", "swept bangs"],
	eyes: ["((eyes visible through hair))", "expressionless eyes", "beautiful detailed eyes, jewel-like eyes, diamond-shaped eyes", "(((empty eyes)))", "hollow eyes", "((((heart-shaped pupils))))", "(almost closed eyes)", "closed eyes", "creepy eyes", "((flaming eyes))", "((eyes(glowing)))", "((flaming eyes)), contracted pupils", "((beautiful detailed eyeslashes))", "detailed glitter eyes", "(mismatched pupils)", "beautiful closed eyes", "beautiful detailed eyes, blue eyes: 7, pink eyes: 3, jewel-like eyes"],
	emotion: ["laughing", "cringe", "nervous", "sleepy", "smug", "surprised", "anger vein", "annoyed", "blush", "bored", "confused", "covering", "disdain", "drool", "embarrassed", "endured face", "evil smile", "expressionless", "fang", "frown", "frustrated", "grin", "horrified", "jealous", "jitome", "moaning", "naughty face", "one eye closed", "open mouth", "sad", "sanpaku", "scared", "seductive smile", "serious", "sigh", "smirk", "tareme", "thinking", "torogao", "trembling", "tsundere", "worried"],
	pose: ["crossed legs, standing", "butterfly sitting pose, holding feet", "walking, dynamic pose", "(((hugging own legs)))", "((yokozuwari))", "top-down bottom-up, upside down, jack-o' challenge", "look back", "all fours", "ass focus", "breast convious", "breast focus", "head rest", "head tilt", "hold legs up", "humpbacked", "kneeling", "leaning forward", "leg lift", "lying", "lying on stomach", "reclining", "seiza", "sitting", "slouching", "squatting, ass focus", "standing split, holding leg", "supine", "wariza"],
	body: ["plus size", "((very small breasts))", "((extra large breast))", "((flat chest))", "((plus size))", "(cleavage)", "large breast", "small breasts", "medium breast", "medium breast", "medium breast"],
	costume: ["(pink white short sexy apron), naked", "(((white lace)))", "(((plain white knitted loose sweater)), (((((loose clothes)))), ((long sweater)), ((sleeves past fingers))", "((((sexy lingerie))))", "beautiful detailed sexy underwear", "backless outfit", "bandeau", "beautiful detailed kimono, japanese pattern print, floral print", "beautiful detailed pink yukata, japanese print", "bikini", "black bunny girl", "chinese clothes, hanfu", "dress", "hakama", "latex suit", "leotard", "maid apron", "micro bikini", "mobile latex suit", "office lady, short skirt", "pink strapless dress", "sailor dress", "school swimsuit", "school uniform", "shiny latex suit", "soldier commander uniform", "stripes dress", "wafuku", "nurse outfit", "cheerleader outfit", "tracksuit", "summer dress", "casual clothes"],
	legware: ["cross-laced footwear", "((geta))", "(torn legware), black leggings", "garter belt", "garter straps", "high heels", "knee highs", "lace-trimmed legwear", "leg warmers", "loafers", "mary janes", "pantyhose", "pink thighhighs", "stocking", "white stockings", "black stockings", "torn thighhighs"],
	accessories: ["beautiful detailed jewel leather collar", "bowtie", "choker", "crystal horns", "detached collar", "goggles", "hair accessories", "hair bow", "hair flower", "hair ribbon", "hairband", "hairclip", "halo", "halterneck", "jewelry", "mask", "necklace"],
	time_of_day: ["sunset", "noon", "night", "dawn"],
	scenes: ["classroom", "forest", "city street", "rooftop", "bedroom", "café", "park", "library",
		"train station", "festival", "garden, flowers", "beach, seaside", "cyberpunk, futuristic city", "indoor", "public toilet", 'outdoors', "liquor bar counter", "in spring, cherry blossom", "church", "indoor pool", "music stage", "onsen", "pool"],
    view: ["blurry foreground", "close-up", "cowboy shot", "dutch angle"]
};

const promptBox = document.getElementById('promptBox');
const copyBtn = document.getElementById('copyBtn');
let promptText = '';
let params = '';

// Update prompt when a button is clicked
function toggleWord(word, category) {
    if (promptText.includes(word)) {
        promptText = promptText.replace(`, ${word}`, '').replace(word, '');
    } else {
        promptText += promptText ? `, ${word}` : word;
    }
    promptBox.value = promptText + params;
}

// Generate buttons dynamically for each category
for (let category in categories) {
    const container = document.getElementById(category);
    categories[category].forEach(word => {
        const button = document.createElement('button');
        button.innerText = word;
        button.onclick = () => toggleWord(word, category);
        container.appendChild(button);
    });
}

// Copy prompt text to clipboard
copyBtn.addEventListener('click', () => {
    promptBox.select();
    document.execCommand('copy');
});

// Toggle parameter buttons
document.getElementById('hd-toggle').addEventListener('click', () => {
    if (params.includes('-n')) {
        params = params.replace(' -n', '');
    } else {
        params += ' -n';
    }
    promptBox.value = promptText + params;
});

document.getElementById('landscape-toggle').addEventListener('click', () => {
    if (params.includes('-l')) {
        params = params.replace(' -l', '');
    } else {
        params += ' -l';
    }
    promptBox.value = promptText + params;
});

document.getElementById('scale').addEventListener('input', (e) => {
    params = params.replace(/ -s \d+/, '');
    params += ` -s ${e.target.value}`;
    promptBox.value = promptText + params;
});

document.getElementById('model').addEventListener('change', (e) => {
    params = params.replace(/ -c \d+/, '');
    params += ` -c ${e.target.value}`;
    promptBox.value = promptText + params;
});

document.getElementById('h').addEventListener('input', (e) => {
    params = params.replace(/ -h \d+(\.\d+)?/, '');
    params += ` -h ${e.target.value}`;
    promptBox.value = promptText + params;
});


