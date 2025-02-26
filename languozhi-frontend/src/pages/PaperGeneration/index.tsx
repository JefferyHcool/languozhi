import styles from './index.module.css'
import Controller from '@/pages/PaperGeneration/components/Controller'
import Generator from '@/pages/PaperGeneration/components/Generator'
import { Drawer } from 'antd'
import { useAttributionStore } from '@/store/attributionStore'
import AttributionConfig from '@/pages/PaperGeneration/components/AttributionConfig'
import { QuestionTypeCN } from '@/enums/questionEnums'

const paperGeneration = () => {
  const { currentItem, openDrawer, closeDrawer, isOpen } = useAttributionStore()

  return (
    <div className={styles.Container}>
      <Controller />
      <div
        className="w-[1px] my-[8px] mr-3 hidden lg:block"
        style={{
          background: 'linear-gradient(rgb(252, 252, 252), rgb(230, 230, 230), rgb(252, 252, 252)), rgb(230, 230, 230)'
        }}
      ></div>
      <Generator />
      <Drawer title={QuestionTypeCN[currentItem as keyof typeof QuestionTypeCN]} open={isOpen} onClose={closeDrawer}>
        <AttributionConfig></AttributionConfig>
      </Drawer>
    </div>
  )
}
export default paperGeneration
