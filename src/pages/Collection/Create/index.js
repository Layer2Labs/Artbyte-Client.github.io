import React, { useRef, useState } from 'react';
import cx from 'classnames';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PublishIcon from '@material-ui/icons/Publish';
import ImageIcon from '@material-ui/icons/Image';
import DnsIcon from '@material-ui/icons/Dns';
import PublicIcon from '@material-ui/icons/Public';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import CollectionsIcon from '@material-ui/icons/Collections';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import BuildIcon from '@material-ui/icons/Build';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import CloseIcon from '@material-ui/icons/Close';
import Web from '@material-ui/icons/Web';
import Twitter from '@material-ui/icons/Twitter';
import Instagram from '@material-ui/icons/Instagram';
import Telegram from '@material-ui/icons/Telegram';

import discordIcon from '../../../assets/svgs/discord.svg';
import mediumIcon from '../../../assets/svgs/medium.svg';
import nftIcon from '../../../assets/svgs/nft.svg';

import styles from './styles.module.scss';

const categories = [
  {
    id: 0,
    icon: ImageIcon,
    label: 'Art',
  },
  {
    id: 1,
    icon: DnsIcon,
    label: 'Domain Names',
  },
  {
    id: 2,
    icon: PublicIcon,
    label: 'Virtual Worlds',
  },
  {
    id: 3,
    icon: CardGiftcardIcon,
    label: 'Trading Cards',
  },
  {
    id: 4,
    icon: CollectionsIcon,
    label: 'Collectibles',
  },
  {
    id: 5,
    icon: SportsTennisIcon,
    label: 'Sports',
  },
  {
    id: 6,
    icon: BuildIcon,
    label: 'Utility',
  },
  {
    id: 7,
    icon: FiberNewIcon,
    label: 'New',
  },
];

const CollectionCreate = () => {
  const inputRef = useRef(null);

  const [logo, setLogo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState([]);

  const isMenuOpen = Boolean(anchorEl);

  const options = categories.filter(cat => selected.indexOf(cat.id) === -1);
  const selectedCategories = categories.filter(
    cat => selected.indexOf(cat.id) > -1
  );

  const handleFileSelect = e => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();

      reader.onload = function(e) {
        setLogo(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const selectCategory = catId => {
    setSelected([...selected, catId]);
  };

  const deselectCategory = catId => {
    setSelected(selected.filter(id => id !== catId));
  };

  const menuId = 'select-category-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      classes={{
        paper: styles.menu,
      }}
    >
      {options.map((cat, idx) => (
        <MenuItem
          key={idx}
          className={styles.category}
          onClick={() => selectCategory(cat.id)}
        >
          <cat.icon />
          <span className={styles.categoryLabel}>{cat.label}</span>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.title}>Create Collection</div>

        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>Logo image</div>
          <div className={styles.inputSubTitle}>
            This image will also be used for navigation. 300x300 recommended.
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.logoUploadBox}>
              {logo && <img src={logo} />}
              <div className={styles.uploadOverlay}>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileSelect}
                />
                <PublishIcon
                  onClick={() => inputRef.current?.click()}
                  className={styles.uploadIcon}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>Name</div>
          <div className={styles.inputWrapper}>
            <input className={styles.input} />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>Description</div>
          <div className={styles.inputSubTitle}>4 of 1000 characters used.</div>
          <div className={styles.inputWrapper}>
            <textarea className={cx(styles.input, styles.longInput)} />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>Category</div>
          <div className={styles.inputSubTitle}>
            Adding a category will help make your item discoverable on Fantom.
          </div>
          <div className={cx(styles.inputWrapper, styles.categoryList)}>
            <div className={styles.categoryButton} onClick={handleMenuOpen}>
              Add Category
            </div>
            {selectedCategories.map((cat, idx) => (
              <div
                className={styles.selectedCategory}
                key={idx}
                onClick={() => deselectCategory(cat.id)}
              >
                <cat.icon />
                <span className={styles.categoryLabel}>{cat.label}</span>
                <CloseIcon className={styles.closeIcon} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>Links</div>
          <div className={styles.inputWrapper}>
            <div className={styles.linksWrapper}>
              <div className={styles.linkItem}>
                <div className={styles.linkIconWrapper}>
                  <img src={nftIcon} className={styles.linkIcon} />
                </div>
                <div className={styles.inputPrefix}>
                  https://ftmscan.com/address/
                </div>
                <input className={styles.linkInput} placeholder="0x..." />
              </div>
              <div className={styles.linkItem}>
                <div className={styles.linkIconWrapper}>
                  <Web className={styles.linkIcon} />
                </div>
                <div className={styles.inputPrefix} />
                <input className={styles.linkInput} placeholder="yoursite.io" />
              </div>
              <div className={styles.linkItem}>
                <div className={styles.linkIconWrapper}>
                  <img src={discordIcon} className={styles.linkIcon} />
                </div>
                <div className={styles.inputPrefix}>https://discord.gg/</div>
                <input className={styles.linkInput} placeholder="abcdef" />
              </div>
              <div className={styles.linkItem}>
                <div className={styles.linkIconWrapper}>
                  <Twitter className={styles.linkIcon} />
                </div>
                <div className={styles.inputPrefix}>@</div>
                <input
                  className={styles.linkInput}
                  placeholder="YourTwitterHandle"
                />
              </div>
              <div className={styles.linkItem}>
                <div className={styles.linkIconWrapper}>
                  <Instagram className={styles.linkIcon} />
                </div>
                <div className={styles.inputPrefix}>@</div>
                <input
                  className={styles.linkInput}
                  placeholder="YourInstagramHandle"
                />
              </div>
              <div className={styles.linkItem}>
                <div className={styles.linkIconWrapper}>
                  <img src={mediumIcon} className={styles.linkIcon} />
                </div>
                <div className={styles.inputPrefix}>@</div>
                <input
                  className={styles.linkInput}
                  placeholder="YourMediumHandle"
                />
              </div>
              <div className={styles.linkItem}>
                <div className={styles.linkIconWrapper}>
                  <Telegram className={styles.linkIcon} />
                </div>
                <div className={styles.inputPrefix}>https://t.me/</div>
                <input className={styles.linkInput} placeholder="abcdef" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderMenu}
    </div>
  );
};

export default CollectionCreate;
