document.addEventListener('DOMContentLoaded', () => {
    const btnEnter = document.getElementById('btnEnter');
    const authConnection = document.getElementById('authConnection');
    const messengerApp = document.getElementById('messengerApp');
    const phoneNumber = document.getElementById('phoneNumber');
    const loginUsername = document.getElementById('loginUsername');
    
    const profileNameText = document.getElementById('profileNameText');
    const displayPhone = document.getElementById('displayPhone');
    const profileAvatarImg = document.getElementById('profileAvatarImg');
    const inboxMyAvatar = document.getElementById('inboxMyAvatar');

    // Ulgama giriş
    btnEnter.addEventListener('click', () => {
        const uName = loginUsername.value.trim() || "Nazar";
        const pNum = phoneNumber.value.trim();

        if (pNum.length < 8) {
            alert("Telefon belgiňizi dogry giriziň (8 san)!");
            return;
        }

        profileNameText.textContent = uName;
        displayPhone.textContent = pNum;
        
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(uName)}&background=0284c7&color=fff`;
        profileAvatarImg.src = avatarUrl;
        inboxMyAvatar.src = avatarUrl;

        authConnection.classList.add('hidden');
        messengerApp.classList.remove('hidden');
    });

    // Login / Ady üýtgetmek
    const editLoginBtn = document.getElementById('editLoginBtn');
    editLoginBtn.addEventListener('click', () => {
        const newName = prompt("Täze adyňyz/loginiňiz:", profileNameText.textContent);
        if (newName && newName.trim()) {
            profileNameText.textContent = newName.trim();
            const newAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(newName.trim())}&background=0284c7&color=fff`;
            profileAvatarImg.src = newAvatar;
            inboxMyAvatar.src = newAvatar;
        }
    });

    // Surat üýtgetmek
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    changeAvatarBtn.addEventListener('click', () => {
        const imgLink = prompt("Surat linkini (URL) giriziň:");
        if (imgLink && imgLink.trim()) {
            profileAvatarImg.src = imgLink.trim();
            inboxMyAvatar.src = imgLink.trim();
        }
    });

    // Nawigasiýa (Inbox <-> Profil)
    const inboxPage = document.getElementById('inboxPage');
    const profilePage = document.getElementById('profilePage');
    const navInbox = document.getElementById('navInbox');
    const navProfile = document.getElementById('navProfile');
    const closeProfileBtn = document.getElementById('closeProfileBtn');

    navProfile.addEventListener('click', () => {
        inboxPage.classList.add('hidden');
        profilePage.classList.remove('hidden');
        navInbox.classList.remove('active');
        navProfile.classList.add('active');
    });

    navInbox.addEventListener('click', () => {
        profilePage.classList.add('hidden');
        inboxPage.classList.remove('hidden');
        navProfile.classList.remove('active');
        navInbox.classList.add('active');
    });

    closeProfileBtn.addEventListener('click', () => {
        profilePage.classList.add('hidden');
        inboxPage.classList.remove('hidden');
        navProfile.classList.remove('active');
        navInbox.classList.add('active');
    });

    // --- STORY (SÖZDAT) - SURAT / WIDEO ÝÜKLEMEK ---
    const btnCreateStory = document.getElementById('btnCreateStory');
    const storyFileInput = document.getElementById('storyFileInput');
    const storiesContainerList = document.getElementById('storiesContainerList');

    btnCreateStory.addEventListener('click', () => {
        storyFileInput.click();
    });

    storyFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileUrl = URL.createObjectURL(file);
        const isVideo = file.type.startsWith('video');

        const storyDiv = document.createElement('div');
        storyDiv.className = 'story-item';
        storyDiv.innerHTML = `
            <div class="story-ring">
                ${isVideo ? `<video src="${fileUrl}" autoplay muted loop></video>` : `<img src="${fileUrl}">`}
            </div>
            <span>My Story</span>
        `;
        storiesContainerList.appendChild(storyDiv);
        storyFileInput.value = '';
    });

    // --- GRUP WE KANAL MENUSI ---
    const openCreateMenu = document.getElementById('openCreateMenu');
    const createDropdownMenu = document.getElementById('createDropdownMenu');
    const createGroupChannelModal = document.getElementById('createGroupChannelModal');
    const createModalTitle = document.getElementById('createModalTitle');
    const createGroupName = document.getElementById('createGroupName');
    const saveCreateModal = document.getElementById('saveCreateModal');
    const cancelCreateModal = document.getElementById('cancelCreateModal');
    let currentCreationType = 'group';

    openCreateMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        createDropdownMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
        createDropdownMenu.classList.add('hidden');
    });

    document.getElementById('menuCreateGroup').addEventListener('click', () => {
        currentCreationType = 'group';
        createModalTitle.textContent = "Täze Grup Döretmek";
        createGroupName.value = '';
        createGroupChannelModal.classList.remove('hidden');
    });

    document.getElementById('menuCreateChannel').addEventListener('click', () => {
        currentCreationType = 'channel';
        createModalTitle.textContent = "Täze Kanal Döretmek";
        createGroupName.value = '';
        createGroupChannelModal.classList.remove('hidden');
    });

    cancelCreateModal.addEventListener('click', () => {
        createGroupChannelModal.classList.add('hidden');
    });

    saveCreateModal.addEventListener('click', () => {
        const name = createGroupName.value.trim();
        if (!name) return alert("Adyny ýazyň!");

        const iconClass = currentCreationType === 'group' ? 'fa-users' : 'fa-bullhorn';
        const typeText = currentCreationType === 'group' ? 'Grup' : 'Kanal';

        const chatItem = document.createElement('div');
        chatItem.className = 'inbox-chat-item';
        chatItem.setAttribute('onclick', `openChat('${name}', 'online', '${typeText}')`);
        chatItem.innerHTML = `
            <div class="inbox-avatar" style="background:#0284c7; display:flex; align-items:center; justify-content:center; color:white; font-size:1.2rem; border-radius:50%;">
                <i class="fa-solid ${iconClass}"></i>
            </div>
            <div class="inbox-info">
                <h4>${name} <span style="font-size:0.7rem; background:#e0f2fe; color:#0284c7; padding:2px 6px; border-radius:4px;">${typeText}</span></h4>
                <p>Täze ${typeText.toLowerCase()} döredildi</p>
            </div>
        `;

        chatsListContainer.prepend(chatItem);
        createGroupChannelModal.classList.add('hidden');
    });

    // --- TÄZE ADAM GOŞMAK (NOMER BILEN) ---
    const addContactModal = document.getElementById('addContactModal');
    const openAddContactModal = document.getElementById('openAddContactModal');
    const cancelAddContact = document.getElementById('cancelAddContact');
    const saveNewContact = document.getElementById('saveNewContact');
    const newContactName = document.getElementById('newContactName');
    const newContactPhone = document.getElementById('newContactPhone');
    const newContactStatus = document.getElementById('newContactStatus');
    const chatsListContainer = document.getElementById('chatsListContainer');

    openAddContactModal.addEventListener('click', () => addContactModal.classList.remove('hidden'));
    cancelAddContact.addEventListener('click', () => addContactModal.classList.add('hidden'));

    saveNewContact.addEventListener('click', () => {
        const cName = newContactName.value.trim();
        const cPhone = newContactPhone.value.trim();
        const cStatus = newContactStatus.value;
        if (!cName) return alert("Adyny ýazyň!");
        if (cPhone.length < 8) return alert("Telefon belgiňizi dogry giriziň (8 san)!");

        const statusText = cStatus === 'online' ? '● Online' : 'Offline';
        const statusClass = cStatus === 'online' ? 'status-online' : 'status-offline';

        const chatItem = document.createElement('div');
        chatItem.className = 'inbox-chat-item';
        chatItem.setAttribute('onclick', `openChat('${cName}', '${cStatus}', 'user')`);
        chatItem.innerHTML = `
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(cName)}&background=random&color=fff" class="inbox-avatar">
            <div class="inbox-info">
                <h4>${cName}</h4>
                <p>+993 ${cPhone}</p>
                <p class="${statusClass}">${statusText}</p>
            </div>
        `;

        chatsListContainer.prepend(chatItem);
        newContactName.value = '';
        newContactPhone.value = '';
        addContactModal.classList.add('hidden');
    });
});

// --- ÇAT PENJIRESI WE SAZLAMALAR (BLOK / UDALIT) ---
const chatMainScreen = document.getElementById('chatMainScreen');
const activeChatTitle = document.getElementById('activeChatTitle');
const activeChatStatus = document.getElementById('activeChatStatus');
const headerDotIndicator = document.getElementById('headerDotIndicator');
const backToInbox = document.getElementById('backToInbox');
const activeChatImg = document.getElementById('activeChatImg');
let activeChatNameGlobal = '';

function openChat(name, status, type) {
    activeChatNameGlobal = name;
    activeChatTitle.textContent = name;
    
    if (type === 'user') {
        activeChatImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
        if (status === 'online') {
            activeChatStatus.textContent = "online";
            activeChatStatus.style.color = "#22c55e";
            headerDotIndicator.className = "dot-indicator online";
        } else {
            activeChatStatus.textContent = "offline";
            activeChatStatus.style.color = "#94a3b8";
            headerDotIndicator.className = "dot-indicator offline";
        }
    } else {
        activeChatImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0284c7&color=fff`;
        activeChatStatus.textContent = type;
        activeChatStatus.style.color = "#0284c7";
        headerDotIndicator.className = "dot-indicator online";
    }

    chatMainScreen.classList.remove('hidden');
}

backToInbox.addEventListener('click', () => {
    chatMainScreen.classList.add('hidden');
});

// Çat Sazlamalary (Blok / Udalit)
const btnChatSettings = document.getElementById('btnChatSettings');
const chatSettingsModal = document.getElementById('chatSettingsModal');
const closeChatSettings = document.getElementById('closeChatSettings');
const blockUserBtn = document.getElementById('blockUserBtn');
const deleteChatBtn = document.getElementById('deleteChatBtn');

btnChatSettings.addEventListener('click', () => {
    chatSettingsModal.classList.remove('hidden');
});

closeChatSettings.addEventListener('click', () => {
    chatSettingsModal.classList.add('hidden');
});

blockUserBtn.addEventListener('click', () => {
    alert(activeChatNameGlobal + " bloklandy!");
    chatSettingsModal.classList.add('hidden');
    chatMainScreen.classList.add('hidden');
});

deleteChatBtn.addEventListener('click', () => {
    if (confirm("Bu çaty pozmak isleýärsiňizmi?")) {
        alert("Çat pozuldy!");
        chatSettingsModal.classList.add('hidden');
        chatMainScreen.classList.add('hidden');
    }
});

// Habar ugratmak
const btnSendMsg = document.getElementById('btnSendMsg');
const inputMsg = document.getElementById('inputMsg');
const messagesContainer = document.getElementById('messagesContainer');

btnSendMsg.addEventListener('click', () => {
    const text = inputMsg.value.trim();
    if(!text) return;
    const div = document.createElement('div');
    div.className = 'msg sent';
    div.innerHTML = `<div class="msg-bubble">${text}</div>`;
    messagesContainer.appendChild(div);
    inputMsg.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Wideo we Sesli Jaň logikalary
const btnVideoCall = document.getElementById('btnVideoCall');
const videoCallModal = document.getElementById('videoCallModal');
const endCallBtn = document.getElementById('endCallBtn');
const localVideo = document.getElementById('localVideo');
let localStream = null;

btnVideoCall.addEventListener('click', async () => {
    videoCallModal.classList.remove('hidden');
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
    } catch (err) {
        alert("Kamerany açyp bolmady: " + err.message);
        videoCallModal.classList.add('hidden');
    }
});

endCallBtn.addEventListener('click', () => {
    if (localStream) localStream.getTracks().forEach(track => track.stop());
    videoCallModal.classList.add('hidden');
});