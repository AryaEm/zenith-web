const FooterLinks = () => {
    const linkGroups = [
        ["About Zenith", "Jobs", "Zenith Developer", "Zenith Distribution", "Sponsor"],
        ["Support", "Gift Card", "Download", "Company", "Contact"],
    ];

    return (
        <div className="flex justify-end items-center gap-10 w-full h-full text-white ">
            {linkGroups.map((group, index) => (
                <div key={index} className="flex flex-col space-y-2">
                    {group.map((link, idx) => (
                        <a key={idx} href="#" className="hover:underline">
                            {link}
                        </a>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default FooterLinks;
