/* =========================================
   LARCK ME JAVASCRIPT
========================================= */


/* =========================================
   SUPABASE
========================================= */

const SUPABASE_URL =
    "https://hxtwdzvnqtxoutdetfoy.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_hEot0ds6XIcLYo7Fj8xtUQ_0ICFxMBV";

const larckSupabase =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


/* =========================================
   CURRENT USER PROFILE
========================================= */

let currentProfile = null;


/* =========================================
   LOAD USER PROFILE
========================================= */

async function loadUserProfile() {

    try {

        /* GET CURRENT USER */

        const {
            data: {
                user
            },
            error: userError
        } = await larckSupabase.auth.getUser();


        if (userError || !user) {

            window.location.href = "page1.html";

            return;

        }


        /* GET PROFILE */

        const {
            data: profile,
            error: profileError
        } = await larckSupabase
            .from("profiles")
            .select(
                "username, larck_id, country, profile_picture"
            )
            .eq("id", user.id)
            .maybeSingle();


        if (profileError) {

            console.error(
                "Profile error:",
                profileError
            );

            alert(
                "Something went wrong while loading your profile."
            );

            return;

        }


        if (!profile) {

            console.error(
                "No profile found."
            );

            return;

        }


        /* =====================================
           SAVE PROFILE
        ====================================== */

        currentProfile = profile;


        /* =====================================
           USERNAME
        ====================================== */

        const usernameElement =
            document.getElementById("username");


        if (usernameElement) {

            usernameElement.textContent =
                profile.username || "LARCK User";

        }


        /* =====================================
           LARCK ID
        ====================================== */

        const profileId =
            document.getElementById("profileId");


        if (profileId) {

            profileId.textContent =
                "ID: " +
                (profile.larck_id || "--------");

        }


        /* =====================================
           COUNTRY FLAG
        ====================================== */

        const countryFlag =
            document.getElementById("countryFlag");


        if (countryFlag) {

            const country =
                String(profile.country || "")
                    .trim()
                    .toLowerCase();


            const flags = {

                "nigeria": "🇳🇬",
                "ghana": "🇬🇭",
                "kenya": "🇰🇪",
                "south africa": "🇿🇦",
                "ethiopia": "🇪🇹",
                "philippines": "🇵🇭",
                "united kingdom": "🇬🇧",
                "united states": "🇺🇸",
                "canada": "🇨🇦",
                "india": "🇮🇳",
                "united arab emirates": "🇦🇪",
                "germany": "🇩🇪",
                "france": "🇫🇷",
                "italy": "🇮🇹",
                "spain": "🇪🇸",
                "australia": "🇦🇺",

                "ng": "🇳🇬",
                "gh": "🇬🇭",
                "ke": "🇰🇪",
                "za": "🇿🇦",
                "et": "🇪🇹",
                "ph": "🇵🇭",
                "gb": "🇬🇧",
                "uk": "🇬🇧",
                "us": "🇺🇸",
                "usa": "🇺🇸",
                "ca": "🇨🇦",
                "in": "🇮🇳",
                "ae": "🇦🇪",
                "uae": "🇦🇪",
                "de": "🇩🇪",
                "fr": "🇫🇷",
                "it": "🇮🇹",
                "es": "🇪🇸",
                "au": "🇦🇺"

            };


            countryFlag.textContent =
                flags[country] || "🌍";

        }


        /* =====================================
           PROFILE AVATAR
        ====================================== */

        const avatar =
            document.getElementById("profileAvatar");


        if (avatar) {

            if (profile.profile_picture) {

                avatar.innerHTML =
                    `
                    <img
                        src="${profile.profile_picture}"
                        alt="Profile"
                        style="
                            width:100%;
                            height:100%;
                            object-fit:cover;
                            object-position:center;
                            border-radius:50%;
                            display:block;

                        "
                    >
                    `;

            } else {

                avatar.textContent =
                    getAvatarLetter(
                        profile.username
                    );

            }

        }


        /* =====================================
           SAVE CURRENT LARCK ID
        ====================================== */

        window.currentLarckId =
            profile.larck_id || "";


    } catch (error) {

        console.error(
            "ME page error:",
            error
        );

        alert(
            "Something went wrong while loading your profile."
        );

    }

}


/* =========================================
   AVATAR LETTER
========================================= */

function getAvatarLetter(username) {

    if (!username) {

        return "L";

    }


    return username
        .trim()
        .charAt(0)
        .toUpperCase();

}


/* =========================================
   COPY USER ID
========================================= */

const copyId =
    document.getElementById("copyId");


if (copyId) {

    copyId.addEventListener(
        "click",
        function () {

            const userId =
                window.currentLarckId || "";


            if (!userId) {

                alert(
                    "Your LARCK ID is still loading."
                );

                return;

            }


            if (navigator.clipboard) {

                navigator.clipboard
                    .writeText(userId)

                    .then(function () {

                        alert(
                            "LARCK ID copied: " +
                            userId
                        );

                    })

                    .catch(function () {

                        alert(
                            "Your LARCK ID is: " +
                            userId
                        );

                    });

            } else {

                alert(
                    "Your LARCK ID is: " +
                    userId
                );

            }

        }
    );

}



/* =========================================
   OPEN LARCK WALLET
========================================= */

const coinsCard = document.getElementById("coinsCard");

if (coinsCard) {
    coinsCard.addEventListener("click", function () {
        window.location.href = "wallet.html";
    });
}



/* =========================================
   POINTS
========================================= */

const pointsCard =
    document.getElementById("pointsCard");


if (pointsCard) {

    pointsCard.addEventListener(
        "click",
        function () {

            alert(
                "LARCK Points page will open here."
            );

        }
    );

}


/* =========================================
   FEATURE BUTTONS
========================================= */

const featureItems =
    document.querySelectorAll(
        ".feature-item"
    );


featureItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                const feature =
                    item.dataset.feature;


                if (feature === "level") {

                    alert("LARCK Level Center");

                }

                else if (feature === "store") {

                    alert("LARCK Store");

                }

                else if (feature === "dress") {

                    alert(
                        "LARCK Dress & Profile Items"
                    );

                }

                else if (feature === "host") {

                    alert("LARCK Host Center");

                }

                else if (feature === "recharge") {

                    alert("LARCK Coin Recharge");

                }

                else if (feature === "task") {

                    alert("LARCK Tasks");

                }

                else if (feature === "invite") {

                    alert(
                        "Invite friends to LARCK"
                    );

                }

            }
        );

    }
);


/* =========================================
   ACCOUNT MENU
========================================= */

const menuRows =
    document.querySelectorAll(
        ".menu-row"
    );


menuRows.forEach(
    function (row) {

        row.addEventListener(
            "click",
            function () {

                const menu =
                    row.dataset.menu;


                if (menu === "agent") {

                    alert(
                        "LARCK Agent Center"
                    );

                }

                else if (menu === "settings") {

                    alert(
                        "LARCK Settings"
                    );

                }

                else if (menu === "support") {

                    alert(
                        "LARCK Support"
                    );

                }

            }
        );

    }
);


/* =========================================
   LARCK PAGE NAVIGATION
========================================= */

const bottomNavItems =
    document.querySelectorAll(
        ".bottom-nav-item"
    );


bottomNavItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                const page =
                    item.dataset.page;


                if (page === "home") {

                    window.location.href =
                        "page2.html";

                }

                else if (page === "party") {

                    window.location.href =
                        "page3.html";

                }

                else if (page === "message") {

                    window.location.href =
                        "page4.html";

                }

                else if (page === "me") {

                    window.location.href =
                        "page5.html";

                }

            }
        );

    }
);


/* =========================================
   START PROFILE LOADING
========================================= */

loadUserProfile();

const logoutButton =
    document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async function () {

            const {
                data: { user }
            } = await larckSupabase.auth.getUser();

            if (user) {

                const { error } =
                    await larckSupabase
                    .from("room_members")
                    .delete()
                    .eq("user_id", user.id);

                if (error) {

                    console.error(
                        "Error removing user from room:",
                        error
                    );

                }

            }

            localStorage.removeItem(
                "larckActiveRoom"
            );

            localStorage.removeItem(
                "larckRoomMinimized"
            );

            const {
                error: signOutError
            } =
                await larckSupabase.auth.signOut();

            if (signOutError) {

                console.error(
                    "Logout error:",
                    signOutError
                );

                return;
            }

            window.location.href =
                "index.html";

        }
    );

}

/* =========================================================
   OPEN PROFILE PAGE
========================================================= */

const profileArrow = document.getElementById("profileArrow");

if (profileArrow) {

    profileArrow.addEventListener("click", () => {

        window.location.href = "profile.html";

    });

}

/* =========================================
   LOAD FOLLOWING, FANS AND VISITORS COUNTS
========================================= */

async function loadProfileStats() {
    try {
        const {
            data: { user },
            error: userError
        } = await larckSupabase.auth.getUser();

        if (userError || !user) {
            return;
        }

        // FOLLOWING COUNT
        const { count: followingCount, error: followingError } =
            await larckSupabase
                .from("follows")
                .select("*", { count: "exact", head: true })
                .eq("follower_id", user.id);

        if (followingError) {
            console.error("Following count error:", followingError);
        } else {
            const element = document.getElementById("followingCount");
            if (element) {
                element.textContent = followingCount ?? 0;
            }
        }

        // FANS COUNT
        const { count: fansCount, error: fansError } =
            await larckSupabase
                .from("follows")
                .select("*", { count: "exact", head: true })
                .eq("following_id", user.id);

        if (fansError) {
            console.error("Fans count error:", fansError);
        } else {
            const element = document.getElementById("fansCount");
            if (element) {
                element.textContent = fansCount ?? 0;
            }
        }

        // VISITORS COUNT
        const { count: visitorsCount, error: visitorsError } =
            await larckSupabase
                .from("profile_visitors")
                .select("*", { count: "exact", head: true })
                .eq("profile_owner_id", user.id);

        if (visitorsError) {
            console.error("Visitors count error:", visitorsError);
        } else {
            const element = document.getElementById("visitorsCount");
            if (element) {
                element.textContent = visitorsCount ?? 0;
            }
        }

    } catch (error) {
        console.error("Profile statistics error:", error);
    }
}

// Load the statistics
loadProfileStats();


/* =========================================
   FULL-SCREEN FOLLOWING / FANS / VISITORS
========================================= */

const connectionsOverlay =
    document.getElementById("connectionsOverlay");

const connectionsTitle =
    document.getElementById("connectionsTitle");

const connectionsList =
    document.getElementById("connectionsList");

const connectionsEmpty =
    document.getElementById("connectionsEmpty");

const closeConnections =
    document.getElementById("closeConnections");


/* OPEN THE OVERLAY */

async function openConnections(type) {
    if (!connectionsOverlay) return;

    const titles = {
        following: "Following",
        fans: "Fans",
        visitors: "Visitors"
    };

    connectionsTitle.textContent = titles[type] || "Connections";
    connectionsList.innerHTML = "";
    connectionsEmpty.hidden = true;

    connectionsOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    connectionsList.innerHTML =
        '<p style="text-align:center;padding:24px;color:#777;">Loading...</p>';

    try {
        const {
            data: { user },
            error: authError
        } = await larckSupabase.auth.getUser();

        if (authError || !user) {
            connectionsList.innerHTML = "";
            connectionsEmpty.textContent = "Please log in again.";
            connectionsEmpty.hidden = false;
            return;
        }

        let userIds = [];

        /* FOLLOWING */
        if (type === "following") {
            const { data, error } = await larckSupabase
                .from("follows")
                .select("following_id")
                .eq("follower_id", user.id);

            if (error) throw error;

            userIds = (data || []).map(row => row.following_id);
        }

        /* FANS */
        else if (type === "fans") {
            const { data, error } = await larckSupabase
                .from("follows")
                .select("follower_id")
                .eq("following_id", user.id);

            if (error) throw error;

            userIds = (data || []).map(row => row.follower_id);
        }

        /* VISITORS */
        else if (type === "visitors") {
            const { data, error } = await larckSupabase
                .from("profile_visitors")
                .select("visitor_id, created_at")
                .eq("profile_owner_id", user.id)
                .neq("visitor_id", user.id)
                .order("created_at", { ascending: false });

            if (error) throw error;

            // Show each visitor once, keeping their most recent visit.
            const seen = new Set();

            userIds = (data || [])
                .filter(row => {
                    if (!row.visitor_id || seen.has(row.visitor_id)) {
                        return false;
                    }

                    seen.add(row.visitor_id);
                    return true;
                })
                .map(row => row.visitor_id);
        }

        // Remove duplicate IDs and the current user.
        userIds = [...new Set(userIds)]
            .filter(id => id && id !== user.id);

        if (userIds.length === 0) {
            connectionsList.innerHTML = "";
            connectionsEmpty.textContent = "No users to display yet.";
            connectionsEmpty.hidden = false;
            return;
        }

        /* LOAD THE MATCHING PROFILES */
        const { data: profiles, error: profilesError } =
            await larckSupabase
                .from("profiles")
                .select("id, username, larck_id, profile_picture")
                .in("id", userIds);

        if (profilesError) throw profilesError;

        connectionsList.innerHTML = "";

        // Keep the order returned by the follows/visitors records.
        const profileById = new Map(
            (profiles || []).map(profile => [profile.id, profile])
        );

        const orderedProfiles = userIds
            .map(id => profileById.get(id))
            .filter(Boolean);

        if (orderedProfiles.length === 0) {
            connectionsEmpty.textContent =
                "User profiles could not be found.";
            connectionsEmpty.hidden = false;
            return;
        }

        orderedProfiles.forEach(profile => {
            const row = document.createElement("div");
            row.className = "connection-user";
            row.tabIndex = 0;
            row.setAttribute(
                "aria-label",
                "Open " + (profile.username || "user") + "'s profile"
            );

            const avatar = document.createElement("div");
            avatar.className = "connection-avatar";

            if (profile.profile_picture) {
                const img = document.createElement("img");
                img.src = profile.profile_picture;
                img.alt = "";
                img.loading = "lazy";
                img.onerror = () => {
                    avatar.textContent =
                        (profile.username || "L").trim().charAt(0).toUpperCase();
                };
                avatar.appendChild(img);
            } else {
                avatar.textContent =
                    (profile.username || "L").trim().charAt(0).toUpperCase();
            }

           
const userInfo = document.createElement("div");
userInfo.className = "connection-user-info";

const name = document.createElement("div");
name.className = "connection-username";
name.textContent = profile.username || "LARCK User";

const larckId = document.createElement("div");
larckId.className = "connection-larck-id";
larckId.textContent = "ID: " + (profile.larck_id || "--------");

userInfo.append(name, larckId);
row.append(avatar, userInfo);

            const openUserProfile = () => {
                if (!profile.larck_id) {
                    alert("This user does not have a LARCK ID available.");
                    return;
                }

                window.location.href =
                    "profile.html?id=" +
                    encodeURIComponent(profile.larck_id);
            };

            row.addEventListener("click", openUserProfile);

            row.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openUserProfile();
                }
            });

            connectionsList.appendChild(row);
        });

    } catch (error) {
        console.error("Unable to load connections:", error);

        connectionsList.innerHTML = "";
        connectionsEmpty.textContent =
            "Unable to load this list. Please try again.";
        connectionsEmpty.hidden = false;
    }
}


/* MAKE THE THREE STATISTICS CLICKABLE */

const followingStat =
    document.getElementById("followingStat");

const fansStat =
    document.getElementById("fansStat");

const visitorsStat =
    document.getElementById("visitorsStat");

if (followingStat) {
    followingStat.style.cursor = "pointer";
    followingStat.addEventListener("click", () => {
        openConnections("following");
    });
}

if (fansStat) {
    fansStat.style.cursor = "pointer";
    fansStat.addEventListener("click", () => {
        openConnections("fans");
    });
}

if (visitorsStat) {
    visitorsStat.style.cursor = "pointer";
    visitorsStat.addEventListener("click", () => {
        openConnections("visitors");
    });
}


/* CLOSE THE OVERLAY */

function closeConnectionsOverlay() {
    if (!connectionsOverlay) return;

    connectionsOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

if (closeConnections) {
    closeConnections.addEventListener(
        "click",
        closeConnectionsOverlay
    );
}
