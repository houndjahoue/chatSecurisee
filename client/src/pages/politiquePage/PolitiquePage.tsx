import SettingAsideLeft from '../../components/settingAsideLeft/settingAsideLeft';
import Politique from '../../components/politique/Politique';

const PolitiquePage = () => {

  return (
    <div>
      <div className="main">
        <div className="aside">
          <SettingAsideLeft />
          <Politique />
        </div>
      </div>
    </div>
  );
};

export default PolitiquePage;
