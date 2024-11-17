import SettingAsideLeft from '../../components/settingAsideLeft/settingAsideLeft';
import Edit from '../../components/settingAsideRight/edit/edit';

const setting = () => {
  return (
    <>
      <div className="main">
        <div className="aside">
          <SettingAsideLeft />
          <Edit />
        </div>
      </div>
    </>
  );
};

export default setting;
